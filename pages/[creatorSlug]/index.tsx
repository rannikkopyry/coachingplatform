import Link from 'next/link';
import { useState, ReactNode, useEffect, ReactElement } from 'react';
import { ImageListType } from 'react-images-uploading';
import ImageUploading from 'react-images-uploading';
import Image from 'next/image';
import { useUser } from 'utils/useUser';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase-client';
import SimpleLayout from 'components/SimpleLayout';
import { string } from 'yup';

interface Link {
  title: String;
  url: string;
  id: string;
  thumbnail_url: string;
  tagline: string;
  tags: any;
}

interface SocialLink {
  title: string;
  url: string;
  id: string;
  type: string;
}

const TreePage = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>();
  const [url, setUrl] = useState<string | undefined>();
  const [userId, setUserId] = useState<string | undefined>();
  const [linkId, setLinkId] = useState<string | undefined>();
  const [socialLinkId, setSocialLinkId] = useState<string | undefined>();
  const [links, setLinks] = useState<Link[]>();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>();
  const [images, setImages] = useState<ImageListType>([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | any>();
  const [tagline, setTagline] = useState<string | any>();
  const [tags, setTags] = useState<string | any>([]);
  const [carUrl, setCarUrl] = useState<string | any>();
  const [username, setUsername] = useState<string | any>();
  const [open, setOpen] = useState<number | null>(1);
  const [city, setCity] = useState<string | any>();
  const [country, setCountry] = useState<string | any>();
  const [socialTitle, setSocialTitle] = useState<string | undefined>();
  const [socialType, setSocialType] = useState<string | undefined>();
  const [socialUrl, setSocialUrl] = useState<string | undefined>();
  const [bio, setBio] = useState<string | any>();
  const user = useUser();

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

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

  // Get listings
  useEffect(() => {
    const getLinks = async () => {
      try {
        const { data, error } = await supabase
          .from('links')
          .select('title, url, id, thumbnail_url, tagline, tags')
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

  // Get social links
  useEffect(() => {
    const getSocialLinks = async () => {
      try {
        const { data, error } = await supabase
          .from('social_links')
          .select('title, url, id, type')
          .eq('user_id', userId);
        if (error) throw error;
        if (data) {
          setSocialLinks(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      getSocialLinks();
    }
  }, [userId]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, profile_picture_url, username, bio, country, city')
          .eq('username', creatorSlug);
        if (error) throw error;
        const profilePictureUrl = data![0]['profile_picture_url'];
        const userId = data![0]['id'];
        const userName = data![0]['username'];
        const bio = data![0]['bio'];
        const country = data![0]['country'];
        const city = data![0]['city'];
        setProfilePictureUrl(profilePictureUrl);
        setUserId(userId);
        setBio(bio);
        setCity(city);
        setCountry(country);
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
            tagline: tagline,
            tags: tags
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

  // Create a social link
  const addNewSocialLink = async () => {
    try {
      if (socialTitle && socialUrl && userId) {
        const { data, error } = await supabase
          .from('social_links')
          .insert({
            title: socialTitle,
            url: socialUrl,
            user_id: userId,
            type: socialType
          })
          .select();
        if (error) throw error;
        console.log('data', data);
        if (socialLinks && data) {
          setSocialLinks([...data, ...socialLinks]);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // Delete one link
  const deleteLink = async () => {
    try {
      const { error } = await supabase.from('links').delete().eq('id', linkId);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  // Delete social link
  const deleteSocialLink = async () => {
    try {
      const { error } = await supabase
        .from('social_links')
        .delete()
        .eq('id', socialLinkId);
      if (error) throw error;
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
            .eq('user', userId);
          if (updateUserResponse.error) throw error;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadSocialPicture = async () => {
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
            .eq('user', userId);
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
          <div className="text-center">
            {profilePictureUrl && (
              <Image
                src={profilePictureUrl}
                alt="Profile picture"
                height="100px"
                width="100px"
                className="rounded-full justify-center"
              />
            )}
            {username && (
              <p className="text-black font-extrabold text-lg">
                motorlinks.io/{creatorSlug}
              </p>
            )}

            {username && (
              <div className="flex items-center justify-center">
                <img className="h-5 text-center" src="/location.svg" alt="" />
                <p className="text-black">
                  {city}, {country}
                </p>
              </div>
            )}
            {username && <p className="text-black font-bold">{bio}</p>}
            {socialLinks?.map((link: SocialLink, index: number) => (
              <div
                className=""
                key={index}
                /* onClick={(e) => {
                  e.preventDefault();
                  window.location.href = link.url;
                }} */
              >
                <div className="h-[50px] mb-4 mt-4 shadow-xl bg-stone-400">
                  <div className="h-full p-4 rounded-2xl">
                    <p className="text-xl font-bold leading-none text-black">
                      {link.title}
                    </p>
                    <button
                      className="text-black"
                      onClick={() => {
                        setSocialLinkId(link.id);
                        deleteSocialLink();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <h2 className="mt-4 text-2xl text-black font-bold">
              Recent listing:
            </h2>
            {links?.map((link: Link, index: number) => (
              <>
                // @ts-ignore
                <div
                  className="shadow-lg"
                  key={index}
                  /*  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = link.url;
                  }} */
                >
                  <div className="h-[200px] overflow-hidden rounded-t-md relative justify-center">
                    <img src={link.thumbnail_url} alt="" className="" />
                    <span className="absolute py-1 px-2 top-2 left-2 rounded-full bg-stone-800 text-white text-xs z-10">
                      58 725€
                    </span>
                  </div>
                  <div className="h-full p-2 rounded-b-md bg-white">
                    <p className="text-md font-bold leading-none text-black">
                      {link.title}
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      {link.tagline}
                    </p>
                    <p
                      className="jsx-902cb4503c8a7a8 text-[10px] text-stone-500 mt-2 flex gap-2"
                      key={index}
                    >
                      <span className="jsx-902cb4503c8a7a8 px-[6px] py-[3px] bg-stone-100 rounded-md flex gap-1 items-center">
                        4Wd
                      </span>
                    </p>
                    ;
                    {links.tags?.map((tag, index) => {
                      <p
                        className="jsx-902cb4503c8a7a8 text-[10px] text-stone-500 mt-2 flex gap-2"
                        key={index}
                      >
                        <span className="jsx-902cb4503c8a7a8 px-[6px] py-[3px] bg-stone-100 rounded-md flex gap-1 items-center">
                          {tag[0]}
                        </span>
                      </p>;
                    })}
                    <button
                      className="text-black"
                      onClick={() => {
                        setLinkId(link.id);
                        deleteLink();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            ))}
            <div className="sm:flex sm:flex-col sm:align-center">
              {authenticated && (
                <>
                  <div className="mt-10">
                    <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
                      Edit your page
                    </h1>
                    <div className="flex flex-col bg-stone-500 p-10 mt-10 mb-10">
                      <h2 className="text-black font-extrabold text-2xl">
                        Create a listing
                      </h2>
                      <label className="text-black mt-5" htmlFor="title">
                        Link text
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md text-black border-2 mt-1 p-2"
                        placeholder="My awesome link"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <label className="text-black mt-2" htmlFor="url">
                        Link url
                      </label>
                      <input
                        type="text"
                        name="url"
                        id="urls"
                        className="block w-full rounded-md text-black border-2 mt-1 mb-10 p-2"
                        placeholder="https://nettiauto.com/audi/801721"
                        onChange={(e) => setUrl(e.target.value)}
                      />
                      <label className="text-black mt-2" htmlFor="title">
                        Tagline
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md text-black border-2 mt-1 p-2"
                        placeholder="My awesome link"
                        onChange={(e) => setTagline(e.target.value)}
                      />
                      <label className="text-black mt-2" htmlFor="title">
                        Tags
                      </label>
                      <input
                        type="text"
                        name="tags"
                        id="title"
                        className="block w-full rounded-md text-black border-2 mt-1 p-2"
                        placeholder="My awesome link"
                        onChange={(e) =>
                          setTags((current: any) => [
                            ...current,
                            e.target.value
                          ])
                        }
                      />
                      <h3 className="text-black mt-4">
                        Upload thumbnail for the car
                      </h3>
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
                          <div className="upload__image-wrapper text-black text-center bg-slate-400 border-4 m-2 p-4">
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
                                <img
                                  src={image['data_url']}
                                  alt=""
                                  width="100"
                                />
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
                        className="mt-3 mb-5 w-full min-h-[50px] items-center justify-center rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                      >
                        Upload car picture
                      </button>
                      <button
                        onClick={addNewLink}
                        type="button"
                        className="rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                      >
                        Create a listing
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col bg-stone-500 p-10 mt-10 mb-10">
                      <h2 className="text-black font-extrabold text-2xl">
                        Create a social link
                      </h2>
                      <label className="text-black mt-5" htmlFor="title">
                        Link text
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md text-black border-2 mt-1 p-2"
                        placeholder="My awesome link"
                        onChange={(e) => setSocialTitle(e.target.value)}
                      />
                      <label className="text-black mt-2" htmlFor="url">
                        Link url
                      </label>
                      <input
                        type="text"
                        name="url"
                        id="urls"
                        className="block w-full rounded-md text-black border-2 mt-1 mb-10 p-2"
                        placeholder="https://nettiauto.com/audi/801721"
                        onChange={(e) => setSocialUrl(e.target.value)}
                      />
                      <label className="text-black mt-2" htmlFor="url">
                        Link type
                      </label>
                      <input
                        type="text"
                        name="url"
                        id="urls"
                        className="block w-full rounded-md text-black border-2 mt-1 mb-10 p-2"
                        placeholder="https://nettiauto.com/audi/801721"
                        onChange={(e) => setSocialType(e.target.value)}
                      />
                      <h3 className="text-black mt-4">
                        Upload thumbnail for the car
                      </h3>
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
                          <div className="upload__image-wrapper text-black text-center bg-slate-400 border-4 m-2 p-4">
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
                                <img
                                  src={image['data_url']}
                                  alt=""
                                  width="100"
                                />
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
                        onClick={uploadSocialPicture}
                        type="button"
                        className="mt-3 mb-5 w-full min-h-[50px] items-center justify-center rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                      >
                        Upload car picture
                      </button>
                      <button
                        onClick={addNewSocialLink}
                        type="button"
                        className="rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                      >
                        Create a social link
                      </button>
                    </div>
                  </div>
                </>
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
