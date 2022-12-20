import { useState, useEffect } from 'react';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import { client } from '../client';
import { postsQuery, searchQuery } from '../utils/queries';

const Search = ({ searchTerm }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    // If user has entered a search string populate with relevant posts
    // else just show standard posts
    if (searchTerm) {
      setLoading(true);

      const query = searchQuery(searchTerm.toLowerCase());

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
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner msg='Searching for posts' />}
      {posts?.length !== 0 && <MasonryLayout posts={posts} />}
      {posts?.length === 0 && searchTerm !== '' && !loading && (
        <div>No posts found</div>
      )}
    </div>
  );
};

export default Search;
