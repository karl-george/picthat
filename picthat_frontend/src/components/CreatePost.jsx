import { useState } from 'react';

import { client } from '../client';
import Spinner from './Spinner';

import { categories } from '../utils/data';

const CreatePost = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [url, setUrl] = useState('');
  const [loaading, setLoaading] = useState(false);
  const [category, setCategory] = useState(null);

  return <div>CreatePost</div>;
};

export default CreatePost;
