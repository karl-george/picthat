import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import { client } from '../client';
import { userQuery } from '../utils/queries';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  if (!user) return <Spinner msg='Loading profile...' />;

  return <div>UserProfile</div>;
};

export default UserProfile;
