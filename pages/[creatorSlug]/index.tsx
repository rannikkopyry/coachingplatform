import Link from 'next/link';
import { useState, ReactNode, useEffect } from 'react';
import { ImageListType } from 'react-images-uploading';
import ImageUploading from 'react-images-uploading';
import Image from 'next/image';
import { useUser } from 'utils/useUser';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase-client';
import SimpleLayout from 'components/SimpleLayout';
import { ReactElement } from 'react';

interface Link {
  title: String;
  url: string;
  id: string;
  thumbnail_url: string;
}

const TreePage = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>();
  const [url, setUrl] = useState<string | undefined>();
  const [userId, setUserId] = useState<string | undefined>();
  const [linkId, setLinkId] = useState<string | undefined>();
  const [links, setLinks] = useState<Link[]>();
  const [images, setImages] = useState<ImageListType>([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | any>();
  const [carUrl, setCarUrl] = useState<string | any>();
  const [username, setUsername] = useState<string | any>();
  const user = useUser();

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  useEffect(() => {
    if (user.user != null) {
      setAuthenticated(true);
    }
  }, [user]);

  const router = useRouter();
  const { creatorSlug } = router.query;

  useEffect(() => {
    const getLinks = async () => {
      try {
        const { data, error } = await supabase
          .from('links')
          .select('title, url, id, thumbnail_url')
          .eq('user_id', userId);
        if (error) throw error;
        if (data) {
          setLinks(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      getLinks();
    }
  }, [userId]);

  console.log(links);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, profile_picture_url, username')
          .eq('username', creatorSlug);
        if (error) throw error;
        const profilePictureUrl = data![0]['profile_picture_url'];
        const userId = data![0]['id'];
        const userName = data![0]['username'];
        setProfilePictureUrl(profilePictureUrl);
        setUserId(userId);
        setUsername(userName);
      } catch (error) {
        console.log(error);
      }
    };

    if (creatorSlug) {
      getUser();
    }
  }, [creatorSlug]);

  // Create a link
  const addNewLink = async () => {
    try {
      if (title && url && userId) {
        const { data, error } = await supabase
          .from('links')
          .insert({
            title: title,
            url: url,
            user_id: userId,
            link_id: linkId
          })
          .select();
        if (error) throw error;
        console.log('data', data);
        if (links && data) {
          setLinks([...data, ...links]);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  console.log(links);

  // Delete one link
  const deleteLink = async () => {
    try {
      const { error } = await supabase.from('links').delete().eq('id', linkId);
      if (error) throw error;
      setLinks;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadProfilePicture = async () => {
    try {
      if (images.length > 0) {
        const image = images[0];
        if (image.file && userId) {
          const { data, error } = await supabase.storage
            .from('public')
            .upload(`${userId}/${image.file.name}`, image.file, {
              upsert: true
            });
          if (error) throw error;
          const resp = supabase.storage.from('public').getPublicUrl(data!.path);
          const publicUrl = resp.data.publicUrl;
          const updateUserResponse = await supabase
            .from('users')
            // @ts-ignore
            .update({ profile_picture_url: publicUrl })
            .eq('id', userId);
          if (updateUserResponse.error) throw error;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadCarPicture = async () => {
    try {
      if (images.length > 0) {
        const image = images[0];
        if (image.file && userId) {
          const { data, error } = await supabase.storage
            .from('public')
            .upload(`${userId}/thumbnails/${image.file.name}`, image.file, {
              upsert: true
            });
          if (error) throw error;
          const resp = supabase.storage.from('public').getPublicUrl(data!.path);
          const publicUrl = resp.data.publicUrl;
          const updateUserResponse = await supabase
            .from('links')
            // @ts-ignore
            .update({ thumbnail_url: publicUrl })
            .eq('user', userId)
            .eq('id', linkId);
          if (updateUserResponse.error) throw error;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-white mb-32 min-h-screen">
      <div className="max-w-xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="">
            {profilePictureUrl && (
              <Image
                src={profilePictureUrl}
                alt="Profile picture"
                height="100px"
                width="100px"
                className="rounded-full"
              />
            )}
            {username && <p className="text-black">@ {creatorSlug}</p>}
            {links?.map((link: Link, index: number) => (
              <>
                // @ts-ignore
                <div
                  className="shadow-lg"
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = link.url;
                  }}
                >
                  <div className="h-[150px] overflow-hidden rounded-t-md relative">
                    <img src={link.thumbnail_url} alt="" />
                    <span className="absolute py-1 px-2 top-2 left-2 rounded-full bg-stone-800 text-white text-xs z-10">
                      58 725€
                    </span>
                  </div>
                  <div className="h-full p-2 rounded-b-md bg-white">
                    <p className="text-md font-bold leading-none text-black">
                      {link.title}
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      T8 AWD Long Range High Performance Plus Bright Edition aut
                    </p>
                    <p className="jsx-902cb4503c8a7a8 text-[10px] text-stone-500 mt-2 flex gap-2">
                      <span className="jsx-902cb4503c8a7a8 px-[6px] py-[3px] bg-stone-100 rounded-md flex gap-1 items-center">
                        Hybrid
                      </span>
                      <span className="jsx-902cb4503c8a7a8 px-[6px] py-[3px] bg-stone-100 rounded-md flex gap-1 items-center">
                        Family
                      </span>
                      <span className="jsx-902cb4503c8a7a8 px-[6px] py-[3px] bg-stone-100 rounded-md flex gap-1 items-center">
                        4WD
                      </span>
                    </p>
                  </div>
                </div>
              </>
            ))}
            <div className="sm:flex sm:flex-col sm:align-center">
              {authenticated && (
                <div className="mt-10">
                  <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
                    Edit your page
                  </h1>
                  <div className="flex flex-col">
                    <label className="text-black" htmlFor="title">
                      Link text
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="block w-full rounded-md text-black border-2 mt-10 p-2"
                      placeholder="My awesome link"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="text-black" htmlFor="url">
                      Link url
                    </label>
                    <input
                      type="text"
                      name="url"
                      id="urls"
                      className="block w-full rounded-md text-black border-2 mt-10 mb-10 p-2"
                      placeholder="https://nettiauto.com/audi/801721"
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  <h3 className="text-black">Upload thumbnail for the car</h3>
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
                      dragProps
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
                        <button onClick={onImageRemoveAll}>
                          Remove all images
                        </button>
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                              <button onClick={() => onImageUpdate(index)}>
                                Update
                              </button>
                              <button onClick={() => onImageRemove(index)}>
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ImageUploading>
                  <button
                    onClick={uploadCarPicture}
                    type="button"
                    className="mt-3 w-full min-h-[50px] items-center justify-center rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                  >
                    Upload car picture
                  </button>
                  <button
                    onClick={addNewLink}
                    type="button"
                    className="rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                  >
                    Create a link
                  </button>
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
                      dragProps
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
                        <button onClick={onImageRemoveAll}>
                          Remove all images
                        </button>
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                              <button onClick={() => onImageUpdate(index)}>
                                Update
                              </button>
                              <button onClick={() => onImageRemove(index)}>
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ImageUploading>
                  <button
                    onClick={uploadProfilePicture}
                    type="button"
                    className="mt-3 w-full min-h-[50px] items-center justify-center rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                  >
                    Upload profile picture
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

TreePage.getLayout = function (page: ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export default TreePage;
