import { Speaker as SpeakerIcon, Close as XIcon } from '@mui/icons-material';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useAppSelector } from 'redux/store';

type Props = {
  children?: never;
};

export const Banner: React.FC<Props> = () => {
  const { status } = useAppSelector((state) => state.auth);
  const [show, setShow] = useState(true);
  if (status === 'authenticated' || !show) {
    return <div />;
  }
  return (
    <div className="bg-indigo-600">
      <div className="py-3 px-3 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-1 items-center w-0">
            <span className="flex p-2 bg-indigo-800 rounded-lg">
              <SpeakerIcon className="w-6 h-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">We announced a new product!</span>
              <span className="hidden md:inline">
                Big news! We're excited to announce a brand new product.
              </span>
            </p>
          </div>
          <div className="flex-shrink-0 order-3 sm:order-2 mt-2 sm:mt-0 w-full sm:w-auto">
            <a
              href={`#`}
              onClick={(e) => {
                e.preventDefault();
                signIn().then((data) => {
                  console.log(`==== data ===`);
                  console.log(data);
                  console.log('==== end log ===');
                });
              }}
              className="flex justify-center items-center py-2 px-4 text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 rounded-md border border-transparent shadow-sm">
              Sign in
            </a>
          </div>
          <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-3">
            <button
              type="button"
              onClick={() => {
                setShow(false);
              }}
              className="flex p-2 -mr-1 sm:-mr-2 hover:bg-indigo-500 rounded-md focus:ring-2 focus:ring-white focus:outline-none">
              <span className="sr-only">Dismiss</span>
              <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
