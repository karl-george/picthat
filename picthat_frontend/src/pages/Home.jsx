import { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import { client } from '../client';
import { fetchUser } from '../utils/fetchUser';
import { userQuery } from '../utils/queries';

import logo from '../assets/logo-no-background.png';

const Home = () => {
  const [user, setUser] = useState();

  // Fetch user from localstorage
  const userInfo = fetchUser();

  useEffect(() => {
    // Get users info
    const query = userQuery(userInfo?.sub);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <div>
      <h1>{user?.userName}</h1>
      <img src={user?.image} />
    </div>
  );
};

export default Home;
