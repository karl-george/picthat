import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { client } from '../client';
import Spinner from './Spinner';

import { categories } from '../utils/data';

const CreatePost = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [url, setUrl] = useState('');
  const [loaading, setLoaading] = useState(false);
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    // Check image type is correct else wrong image type
    if (
      type === 'image/png' ||
      type === 'image/svg' ||
      type === 'image/jpeg' ||
      type === 'image/gif' ||
      type === 'image/tiff'
    ) {
    } else {
      setWrongImageType(true);
    }
  };

  return <div>CreatePost</div>;
};

export default CreatePost;
