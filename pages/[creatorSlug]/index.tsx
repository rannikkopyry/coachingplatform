import Link from 'next/link';
import { useState, ReactNode, useEffect } from 'react';

import { ImageListType } from 'react-images-uploading';
import ImageUploading from 'react-images-uploading';
import Image from 'next/image';
import LoadingDots from 'components/ui/LoadingDots';
import Button from 'components/ui/Button';
import { useUser } from 'utils/useUser';
import { postData } from 'utils/helpers';
import { useRouter } from 'next/router';

import { supabase } from '@/utils/supabase-client';

import { User } from '@supabase/supabase-js';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { profile } from 'console';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

interface Link {
    title: String;
    // Add right type when time 
    url: any;
}

export const getServerSideProps = withPageAuth({ redirectTo: '/signin' });

export default function Tree({ user }: { user: User }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { isLoading, subscription, userDetails } = useUser();
  const [title, setTitle] = useState<string |undefined>();
  const [url, setUrl] = useState<string |undefined>();
  const [userId, setUserId] = useState<string |undefined>();
  const [links, setLinks] = useState<Link[]>();
  const [images, setImages] = useState<ImageListType>([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | any>();

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  }

  const router = useRouter();
  const { creatorSlug } = router.query;

  useEffect(() => {
    setUserId(user.id)
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
      setAuthenticated(true)
        getLinks()
    }
  }, [userId])

 /*  useEffect(() => {
    const getUser = async () => {
      try {
          const { data, error } = await supabase.from("users")
          .select("id, profile_picture_url")
          .eq("username", creatorSlug)
          if (error) throw error;
          const profilePictureUrl = data[0]["profile_picture_url"]
          const userId = data[0]["id"]
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
 */
  // Create a link
  const addNewLink = async () => {
    setUserId(user.id)
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

/*   const uploadProfilePicture = async () => {
    setUserId(user.id)
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
                const resp = supabase.storage.from("public").getPublicUrl(data.path);
                const publicUrl = resp.data.publicUrl;
                const updateUserResponse = await supabase
                .from("users")
                .update({ profile_picture_url: publicUrl })
                .eq("id", userId)
                if (updateUserResponse.error) throw error;
            }
        }
    } catch (error) {
        console.log(error)
    }
  } */

 

  return (
    <section className="bg-white mb-32">
      <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          {authenticated && (
            <div>
            <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
 Create a tree
</h1>
<p className="mt-5 text-xl text-black sm:text-center sm:text-2xl max-w-2xl m-auto">
 Create your linktree
</p>
<input 
type="text" 
name='title'
id='title'
className='block w-full rounded-md text-black border-2 m-2 p-2'
placeholder='my awesome link'
onChange={(e) => setTitle(e.target.value)}
/>
<input 
type="text" 
name='url'
id='urls'
className='block w-full rounded-md text-black border-2 m-2 p-2'
placeholder='my awesome url'
onChange={(e) => setUrl(e.target.value)}
/>
<button onClick={addNewLink} type='button' className='text-black border-2 '>Create a link</button>
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
      <button /* onClick={uploadProfilePicture} */ type='button' className='text-black border-2 '>Upload profile picture</button>
</div>
          )}
          {profilePictureUrl && <Image
          src={profilePictureUrl}
          alt="Profile picture"
          height={100}
          width={100} 
          className="rounded-full"
          />}
        {links?.map((link: Link, index: number) => (
            <div 
            className='text-black border-8 text-center shadow-lg p-8' 
            key={index}
            onClick={(e) => {
                e.preventDefault();
                window.location.href = link.url;
            }}
            >{link.title}</div> 
        ))}
        </div>
      </div>
    </section>
  );
}