import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import { client } from '../client';
import { userQuery } from '../utils/queries';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  const logOut = () => {
    localStorage.clear();

    navigate('/login');
  };

  if (!user) return <Spinner msg='Loading profile...' />;

  return (
    <div className='pb-2 h-full justify-center items-center mt-4'>
      <div className='flex flex-col pb-5'>
        <div className='flex flex-col justify-center items-center'>
          <img
            src={user?.image}
            alt='User icon'
            className='w-32 h-32 rounded-full object-cover shadow-xl'
          />
          <h1 className='font-bold text-3xl text-center mt-6'>
            {user?.userName}
          </h1>
          {userId === user._id && (
            <button
              type='button'
              onClick={logOut}
              className='bg-accent text-white rounded-full px-6 py-2 font-semibold text-base outline-none mt-6'
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
