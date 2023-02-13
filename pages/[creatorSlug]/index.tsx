import Link from 'next/link';
import { useState, ReactNode, useEffect } from 'react';
import { ImageListType } from 'react-images-uploading';
import ImageUploading from 'react-images-uploading';
import Image from 'next/image';
import { useUser } from 'utils/useUser';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase-client';
import SimpleLayout from "components/SimpleLayout"
import { ReactElement } from 'react';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

interface Link {
    title: String;
    // Add right type when time 
    url: string;
}

export default function TreePage() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { isLoading, subscription, userDetails } = useUser();
  const [title, setTitle] = useState<string | undefined>();
  const [url, setUrl] = useState<string | undefined>();
  const [userId, setUserId] = useState<string | undefined>();
  const [links, setLinks] = useState<Link[]>();
  const [images, setImages] = useState<ImageListType>([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | any>();
  const user = useUser();

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  }

  useEffect(() => {
    if (user.user != null) {
      setAuthenticated(true)
    }
  }, [user]);

  const router = useRouter();
  const { creatorSlug } = router.query;

  useEffect(() => {
    const getLinks = async () => {
        try {
            const { data, error } = await supabase
            .from("links")
            .select("title, url")
            .eq("user_id", userId)
            if (error) throw error;
            if (data) {
                setLinks(data)
            }
        } catch (error) {
            console.log(error)
        }
    };
    if (userId) {
        getLinks()
    }
  }, [userId])

  useEffect(() => {
   const getUser = async () => {
      try {
          const { data, error } = await supabase.from("users")
          .select("id, profile_picture_url")
          .eq("username", creatorSlug)
          if (error) throw error;
          const profilePictureUrl = data![0]["profile_picture_url"]
          const userId = data![0]["id"]
          setProfilePictureUrl(profilePictureUrl);
          setUserId(userId)
        } catch (error) {
        console.log(error)
      }
    };

    if (creatorSlug) {
      getUser();
    }
  }, [creatorSlug])

  // Create a link
  const addNewLink = async () => {
    try {
        if (title && url && userId) {
            const { data, error } = await supabase.from("links").insert({
                title: title,
                url: url,
                user_id: userId
            })
            .select();
            if (error) throw error;
            console.log("data", data)
            if (links && data) {
                setLinks([...data, ...links])
            }
        }
    } catch (error) {
        console.log("error", error)
    }
  }

  const uploadProfilePicture = async () => {
    try {
        if (images.length > 0) {
            const image = images[0]
            if (image.file && userId) {
                const { data, error } = await supabase.storage
                .from("public")
                .upload(`${userId}/${image.file.name}`, image.file, {
                  upsert: true
                })
                if (error) throw error;
                const resp = supabase.storage.from("public").getPublicUrl(data!.path);
                const publicUrl = resp.data.publicUrl;
                const updateUserResponse = await supabase
                .from("users")
                // @ts-ignore
                .update({ profile_picture_url: publicUrl })
                .eq("id", userId)
                if (updateUserResponse.error) throw error;
            }
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <section className="bg-white mb-32 min-h-screen">
      <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className='text-center'>
      {profilePictureUrl && <Image
          src={profilePictureUrl}
          alt="Profile picture"
          height="100px"
          width="100px"
          className="rounded-full"
          />}
      {links?.map((link: Link, index: number) => (
            <div 
            className='text-black border-8 text-center shadow-lg p-8 mt-4' 
            key={index}
            onClick={(e) => {
                e.preventDefault();
                window.location.href = link.url;
            }}
            >{link.title}</div> 
        ))}
              <div className="sm:flex sm:flex-col sm:align-center">
          {authenticated && (
            <div className='mt-10'>
            <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
                  Edit your page
            </h1>
            <input 
              type="text" 
              name='title'
              id='title'
              className='block w-full rounded-md text-black border-2 mt-10 p-2'
              placeholder='My awesome link'
              onChange={(e) => setTitle(e.target.value)}
            />
            <input 
            type="text" 
            name='url'
            id='urls'
            className='block w-full rounded-md text-black border-2 mt-10 mb-10 p-2'
            placeholder='https://nettiauto.com/audi/801721'
            onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={addNewLink} type='button' className='rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0'>Create a link</button>
            <ImageUploading
                    multiple
                value={images}
                onChange={onChange}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
          // write your building UI
          <div className="upload__image-wrapper text-black text-center bg-slate-400 border-4 m-4 p-4">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
          </ImageUploading>
          <button onClick={uploadProfilePicture} type='button' className='mt-3 w-full min-h-[50px] items-center justify-center rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0'>Upload profile picture</button>
        </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}

TreePage.getLayout = function(page: ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};