import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import { client } from '../client';
import {
  userCreatedPostsQuery,
  userQuery,
  userSavedPostsQuery,
} from '../utils/queries';

const activeBtnStyle =
  'text-black font-bold outline-none w-20 p-2 border-b-2 border-black';

const notActiveBtnStyle =
  'text-black font-bold p-2 rounded-md w-20 outline-none hover:bg-gray-200';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [activeBtn, setActiveBtn] = useState('Created');
  const [text, setText] = useState('Created');

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPostsQuery = userCreatedPostsQuery(userId);

      client.fetch(createdPostsQuery).then((data) => {
        setPosts(data);
      });
    } else {
      const savedPostsQuery = userSavedPostsQuery(userId);

      client.fetch(savedPostsQuery).then((data) => {
        setPosts(data);
      });
    }
  }, [text, userId]);

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
              className='bg-accent text-white rounded-full px-6 py-2 font-semibold text-base outline-none mt-8 mb-6'
            >
              Log Out
            </button>
          )}
        </div>
      </div>
      <div className='text-center mb-8 flex justify-center items-center gap-4'>
        <button
          type='button'
          onClick={(e) => {
            setText(e.target.textContent);
            setActiveBtn('Created');
          }}
          className={`${
            activeBtn === 'Created' ? activeBtnStyle : notActiveBtnStyle
          }`}
        >
          Created
        </button>
        <button
          type='button'
          onClick={(e) => {
            setText(e.target.textContent);
            setActiveBtn('Saved');
          }}
          className={`${
            activeBtn === 'Saved' ? activeBtnStyle : notActiveBtnStyle
          }`}
        >
          Saved
        </button>
      </div>
      {posts?.length ? (
        <div className='px-2'>
          <MasonryLayout posts={posts} />
        </div>
      ) : (
        <div className='flex justify-center items-center w-full text-lg mt-2'>
          <p>
            Nothing to see here. Posts you{' '}
            {text === 'Created' ? 'create' : 'save'} will be shown here.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
