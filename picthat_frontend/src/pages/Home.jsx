import { useState, useEffect, useRef } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';

import UserProfile from '../components/UserProfile';
import Sidebar from '../components/Sidebar';
import Wall from './Wall';

import { client } from '../client';
import { fetchUser } from '../utils/fetchUser';
import { userQuery } from '../utils/queries';

import logo from '../assets/logo-no-background.png';

const Home = () => {
  const [user, setUser] = useState();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const scrollRef = useRef(null);

  // Fetch user from localstorage
  const userInfo = fetchUser();

  useEffect(() => {
    // Get users info
    const query = userQuery(userInfo?.sub);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu
            fontSize={40}
            onClick={() => setToggleSidebar(true)}
            className='cursor-pointer'
          />
          <Link to='/'>
            <img src={logo} alt='logo' className='w-14' />
          </Link>
          <Link to={`user/${user?._id}`}>
            <img src={user?.image} alt='user profile' className='w-14' />
          </Link>
        </div>
        {toggleSidebar && (
          <div className='fixed w-3/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle
                fontSize={30}
                className='cursor-pointer'
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/user/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Wall user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
