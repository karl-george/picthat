import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from './Spinner';

import { client } from '../client';

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  return <div>{loading && <Spinner msg={'Adding ideas to your wall'} />}</div>;
};

export default Posts;
