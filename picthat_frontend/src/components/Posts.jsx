import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import { client } from '../client';
import { postsQuery, searchQuery } from '../utils/queries';

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    } else {
      client.fetch(postsQuery).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) return <Spinner msg={'Adding ideas to your wall'} />;

  if (!posts?.length) return <h2>No posts found</h2>;

  return <div>{posts && <MasonryLayout posts={posts} />}</div>;
};

export default Posts;
