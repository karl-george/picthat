import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import { client, urlFor } from '../client';

const PostDetails = () => {
  const [pinDetails, setPinDetails] = useState(null);

  if (!pinDetails) return <Spinner msg='Loading pin...' />;

  return <div>PostDetails</div>;
};

export default PostDetails;
