import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import { client, urlFor } from '../client';
import { postDetailQuery } from '../utils/queries';

const PostDetails = () => {
  const [postDetails, setPostDetails] = useState(null);

  const { postId } = useParams();

  const fetchPostDetails = () => {
    let query = postDetailQuery(postId);

    if (query) {
      client.fetch(query).then((data) => {
        setPostDetails(data[0]);
        console.log(data[0]);
      });
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [postId]);

  if (!postDetails) return <Spinner msg='Loading image...' />;

  return (
    <div>
      <img src={postDetails.image.asset.url} alt='post image' />
      <h1>{postDetails.title}</h1>
    </div>
  );
};

export default PostDetails;
