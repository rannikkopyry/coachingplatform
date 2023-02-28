import Link from 'next/link';
import { useState, ReactNode, useEffect, ReactElement, Fragment } from 'react';
import { ImageListType } from 'react-images-uploading';
import ImageUploading from 'react-images-uploading';
import Image from 'next/image';
import { useUser } from 'utils/useUser';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase-client';
import { string } from 'yup';
import ContactBar from '@/components/ContactBar';
import ContactBarLayout from '@/components/ContactBarLayout';
import SimpleLayout from '@/components/SimpleLayout';
import { Switch } from '@headlessui/react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface Link {
  title: String;
  url: string;
  id: string;
  thumbnail_url: string;
  tagline: string;
  tags: any;
  price: string;
}

interface SocialLink {
  title: string;
  url: string;
  id: string;
  type: string;
}

const socials = [
  { id: 1, name: 'Instagram' },
  { id: 2, name: 'Twitter' },
  { id: 3, name: 'Whatsapp' },
  { id: 4, name: 'BeReal' },
  { id: 5, name: 'Youtube' },
  { id: 6, name: 'Snapchat' }
];

const TreePage = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [editorMode, setEditorMode] = useState<boolean>(false);
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
  const [price, setPrice] = useState<string | any>();
  const [country, setCountry] = useState<string | any>();
  const [socialTitle, setSocialTitle] = useState<string | undefined>();
  const [socialType, setSocialType] = useState<string | undefined>();
  const [socialUrl, setSocialUrl] = useState<string | undefined>();
  const [bio, setBio] = useState<string | any>();
  const [enabled, setEnabled] = useState(false);
  const [showContactBar, setShowContactBar] = useState<boolean | any>(true);

  const [selected, setSelected] = useState(socials[0]);
  const [query, setQuery] = useState('');

  const filteredSocials =
    query === ''
      ? socials
      : socials.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

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
          .select('title, url, id, thumbnail_url, tagline, tags, price')
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
          .select(
            'id, profile_picture_url, username, bio, country, city, contact_bar'
          )
          .eq('username', creatorSlug);
        if (error) throw error;
        const profilePictureUrl = data![0]['profile_picture_url'];
        const userId = data![0]['id'];
        const userName = data![0]['username'];
        const bio = data![0]['bio'];
        const country = data![0]['country'];
        const city = data![0]['city'];
        const contactBar = data![0]['contact_bar'];
        setProfilePictureUrl(profilePictureUrl);
        setUserId(userId);
        setBio(bio);
        setCity(city);
        setCountry(country);
        setProfilePictureUrl(profilePictureUrl);
        setUserId(userId);
        setUsername(userName);
        setShowContactBar(contactBar);
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
            tags: tags,
            price: price
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
            type: selected.name
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
            .eq('user_id', userId);
          if (updateUserResponse.error) throw error;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveContactBarPreferrence = async () => {
    try {
      const updateContactBarPreferrence = await supabase
        .from('users')
        // @ts-ignore
        .update({ contact_bar: enabled })
        .eq('id', userId);
      if (updateContactBarPreferrence.error) throw Error;
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log(editorMode);

  return (
    <>
      <section className="bg-white min-h-screen">
        <div className="max-w-xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
          {authenticated && (
            <div className="right-0">
              <button
                onClick={() => setEditorMode(true)}
                className="px-2 py-3 flex items-center w-full gap-1 outline-none text-black"
              >
                <img className="h-5 mr-2 text-center" src="/edit.svg" alt="" />
                Edit page
              </button>
            </div>
          )}
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
                  <div className="h-[50px] mb-4 mt-4 shadow-2xl bg-white rounded-xl">
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
              {links && links?.length > 0 ? (
                <h2 className="mt-4 text-2xl text-black font-bold">
                  Recent listing:
                </h2>
              ) : (
                <p className="text-black">
                  It seems empty here,{' '}
                  <button>Add your first listing or link.</button>
                </p>
              )}
              {links?.map((link: Link, index: number) => (
                <>
                  // @ts-ignore
                  <div
                    className="shadow-2xl"
                    key={index}
                    /*  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = link.url;
                  }} */
                  >
                    <div className="h-[200px] overflow-hidden rounded-t-md relative justify-center">
                      <img src={link.thumbnail_url} alt="" className="" />
                      <span className="absolute py-1 px-2 top-2 left-2 rounded-full bg-stone-800 text-white text-xs z-10">
                        {link.price}
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
                      {/* {links.tags?.map((tag, index) => {
                        <p
                          className="jsx-902cb4503c8a7a8 text-[10px] text-stone-500 mt-2 flex gap-2"
                          key={index}
                        >
                          <span className="jsx-902cb4503c8a7a8 px-[6px] py-[3px] bg-stone-100 rounded-md flex gap-1 items-center">
                            {tag[0]}
                          </span>
                        </p>;
                      })} */}
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
                {editorMode === true && (
                  <>
                    <div className="mt-10">
                      <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
                        Edit your page
                      </h1>
                      <div className="flex flex-col bg-white p-10 mt-10 mb-10 border-2 rounded-2xl">
                        <h2 className="text-black font-extrabold text-2xl">
                          Create a listing
                        </h2>
                        <label className="text-black mt-5" htmlFor="title">
                          Listing text
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
                          Listing url
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
                          Price
                        </label>
                        <input
                          type="text"
                          name="url"
                          id="urls"
                          className="block w-full rounded-md text-black border-2 mt-1 mb-10 p-2"
                          placeholder="32 550"
                          onChange={(e) => setPrice(e.target.value)}
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
                                style={
                                  isDragging ? { color: 'red' } : undefined
                                }
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
                                    <button
                                      onClick={() => onImageUpdate(index)}
                                    >
                                      Update
                                    </button>
                                    <button
                                      onClick={() => onImageRemove(index)}
                                    >
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
                      <div className="flex flex-col bg-white p-10 mt-10 mb-10 border-2 rounded-2xl">
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
                        <Combobox value={selected} onChange={setSelected}>
                          <div className="relative mt-1">
                            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                              <Combobox.Input
                                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                displayValue={(person: any) => person.name}
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                }
                              />
                              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </Combobox.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                              afterLeave={() => setQuery('')}
                            >
                              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredSocials.length === 0 &&
                                query !== '' ? (
                                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                  </div>
                                ) : (
                                  filteredSocials.map((person) => (
                                    <Combobox.Option
                                      key={person.id}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                          active
                                            ? 'bg-teal-600 text-white'
                                            : 'text-gray-900'
                                        }`
                                      }
                                      value={person}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span
                                            className={`block truncate ${
                                              selected
                                                ? 'font-medium'
                                                : 'font-normal'
                                            }`}
                                          >
                                            {person.name}
                                          </span>
                                          {selected ? (
                                            <span
                                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                active
                                                  ? 'text-white'
                                                  : 'text-teal-600'
                                              }`}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Combobox.Option>
                                  ))
                                )}
                              </Combobox.Options>
                            </Transition>
                          </div>
                        </Combobox>
                        <button
                          onClick={addNewSocialLink}
                          type="button"
                          className="rounded-md mt-5 border border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                        >
                          Create a social link
                        </button>
                      </div>
                      <div className="flex flex-col bg-white p-10 mt-10 mb-10 border-2 rounded-2xl">
                        <h2 className="text-black font-extrabold text-2xl">
                          Toggle contact bar
                        </h2>
                        <Switch
                          checked={enabled}
                          onChange={setEnabled}
                          className={`${
                            enabled ? 'bg-black' : 'bg-gray-200'
                          } relative inline-flex h-6 w-11 items-center rounded-full mt-4`}
                        >
                          <span
                            className={`${
                              enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                        {enabled === true ? (
                          <p className="text-black">Contact bar visible</p>
                        ) : (
                          <p className="text-black">Contact bar not visible</p>
                        )}
                        <button
                          onClick={saveContactBarPreferrence}
                          type="button"
                          className="rounded-md border mt-5 border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {showContactBar == true && <ContactBar />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

TreePage.getLayout = function (page: ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export default TreePage;
