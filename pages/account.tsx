import Link from 'next/link';
import { useState, ReactNode, ReactElement, useEffect } from 'react';
import LoadingDots from 'components/ui/LoadingDots';
import Button from 'components/ui/Button';
import { useUser } from 'utils/useUser';
import { postData } from 'utils/helpers';
import AlternativeLayout from 'components/AlternativeLayout';
import { supabase } from '@/utils/supabase-client';
import { User } from '@supabase/supabase-js';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { ImageListType } from 'react-images-uploading';
import ImageUploading from 'react-images-uploading';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
      <div className="px-5 py-4">
        <h3 className="text-2xl mb-1 font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="border-t border-zinc-700 bg-white p-4 rounded-b-md">
        {footer}
      </div>
    </div>
  );
}

export const getServerSideProps = withPageAuth({ redirectTo: '/signin' });

export default function Account({ user }: { user: User }) {
  const [userId, setUserId] = useState<string | undefined>();
  const [userName, setUserName] = useState<string | any>();
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | any>();
  const [city, setCity] = useState<string | any>();
  const [updatedCountry, setUpdatedCountry] = useState<string | any>();
  const [updatedCity, setUpdatedCity] = useState<string | any>();
  const [updatedBio, setUpdatedBio] = useState<string | any>();
  const [country, setCountry] = useState<string | any>();
  const [bio, setBio] = useState<string | any>();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const { isLoading, subscription, userDetails } = useUser();
  const [images, setImages] = useState<ImageListType>([]);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link'
      });
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setLoading(false);
  };

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, profile_picture_url, username, bio, country, city')
          .eq('id', user.id);
        if (error) throw error;
        const profilePictureUrl = data![0]['profile_picture_url'];
        const userId = data![0]['id'];
        const userName = data![0]['username'];
        const bio = data![0]['bio'];
        const country = data![0]['country'];
        const city = data![0]['city'];
        setProfilePictureUrl(profilePictureUrl);
        setUserId(userId);
        setUserName(userName);
        setBio(bio);
        setCity(city);
        setCountry(country);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getUser();
    }
  }, [profilePictureUrl]);

  // Upload profile picture
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

  // Update account details
  const updateDetails = async () => {
    try {
      if (updatedCity) {
        const { error } = await supabase
          .from('users')
          .update(
            {
              city: updatedCity,
              country: updatedCountry,
              bio: updatedBio
            },
            { upsert: true }
          )
          .eq('id', userId);
        if (error) throw error;
        setReady(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log(userName);

  return (
    <section className="bg-white pb-32 pt-32">
      <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="mt-5 text-xl text-black sm:text-center sm:text-2xl max-w-2xl m-auto">
            We partnered with Stripe for a simplified billing.
          </p>
        </div>
      </div>
      <div className="p-4 text-black">
        <Card
          title="Your Plan"
          description={
            subscription
              ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
              : ''
          }
          footer={
            <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0 text-black">
                Manage your subscription on Stripe.
              </p>
              <Button
                className=""
                variant="slim"
                loading={loading}
                disabled={loading || !subscription}
                onClick={redirectToCustomerPortal}
              >
                Open customer portal
              </Button>
            </div>
          }
        >
          <div className="text-xl mt-8 mb-4 font-semibold">
            {isLoading ? (
              <div className="h-12 mb-6">
                <LoadingDots />
              </div>
            ) : subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              <Link href="/">
                <a>Choose your plan</a>
              </Link>
            )}
          </div>
        </Card>
        <Card
          title="Your username"
          description="Your unique username"
          footer={<p>PNG and JPG formats accepted.</p>}
        >
          <div className="text-xl mt-8 mb-4 font-semibold text-black">
            <span className="text-grey-500">motorlinks.io/</span>
            {userName}
          </div>
        </Card>
        <Card
          title="Your profile pciture"
          description="This picture will be shown at the top of your public page"
          footer={<p>Please use 64 characters at maximum.</p>}
        >
          <div className="text-xl mt-8 mb-4 font-semibold text-black">
            {profilePictureUrl && (
              <Image
                src={profilePictureUrl}
                alt="Profile picture"
                height="100px"
                width="100px"
                className="rounded-full z-0"
              />
            )}
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
                <div className="upload__image-wrapper text-black text-center bg-gray-200 border-4 m-4 p-4 rounded-2xl">
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
        </Card>
        <Card
          title="Your location and biography"
          description="Enter your location and biography text. These are shown in you are public profile."
          footer={<p>This is not required information but recommended.</p>}
        >
          <div className="flex flex-col mt-4">
            <label htmlFor="" className="text-black">
              Your city:
            </label>
            <input
              placeholder="City/Area"
              className="p-4 m-4 bg-gray-200 rounded-2xl"
              defaultValue={city}
              onChange={(e) => setUpdatedCity(e.target.value)}
            />
            <label htmlFor="" className="text-black">
              Your country:
            </label>
            <input
              placeholder="Country"
              className="bg-gray-200 rounded-2xl p-4 m-4"
              defaultValue={country}
              onChange={(e) => setUpdatedCountry(e.target.value)}
            />
            <label htmlFor="" className="text-black">
              Your bio text:
            </label>
            <textarea
              rows={5}
              placeholder="Bio"
              className="bg-gray-200 rounded-2xl p-4 m-4"
              defaultValue={bio}
              onChange={(e) => setUpdatedBio(e.target.value)}
            />
            <button
              onClick={updateDetails}
              type="button"
              className="mt-3 w-full min-h-[50px] items-center justify-center rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
            >
              Save changes
            </button>
            {ready === true && <p className="text-black">Changes succesful</p>}
          </div>
        </Card>
        <Card
          title="Your Email"
          description="Please enter the email address you want to use to login."
          footer={<p>We will email you to verify the change.</p>}
        >
          <p className="text-xl mt-8 mb-4 font-semibold">
            {user ? user.email : undefined}
          </p>
        </Card>
      </div>
    </section>
  );
}

Account.getLayout = function (page: ReactElement) {
  return <AlternativeLayout>{page}</AlternativeLayout>;
};
