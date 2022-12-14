import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BsUpload } from 'react-icons/bs';

import { client } from '../client';
import Spinner from './Spinner';

import { categories } from '../utils/data';

const CreatePost = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
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
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload('image', e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((doc) => {
          setImage(doc);
          setLoading(false);
        })
        .catch((err) => {
          console.log('Image upload error', err);
        });
    } else {
      setWrongImageType(true);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
            {loading && <Spinner />}
            {wrongImageType && (
              <p>Please upload an image of the correct type</p>
            )}
            {!image ? (
              <label className='w-full h-full'>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold text-2xl'>
                      <BsUpload />
                    </p>
                    <p>Click to upload</p>
                  </div>
                  <p></p>
                </div>
                <input
                  type='file'
                  name='upload-image'
                  onChange={uploadImage}
                  className='w-0 h-0'
                />
              </label>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
