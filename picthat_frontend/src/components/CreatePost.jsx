import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BsUpload, BsFillTrashFill } from 'react-icons/bs';

import { client } from '../client';
import Spinner from './Spinner';

import { categories } from '../utils/data';

const CreatePost = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [filledAllFields, setFilledAllFields] = useState(true);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    // Check image type is correct
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

  const savePost = () => {
    if (title && about && image?._id && category) {
      const doc = {
        _type: 'post',
        title,
        about,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: image?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      };

      client.create(doc).then(() => navigate('/'));
    } else {
      setFilledAllFields(false);
      setTimeout(() => setFilledAllFields(true), 2000);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      {!filledAllFields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>
          Please fill in all required fields
        </p>
      )}
      <div className='flex flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
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
              <div className='relative h-full'>
                <img
                  src={image?.url}
                  alt='uploaded pic'
                  className='w-full h-full'
                />
                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                  onClick={() => setImage(null)}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add your title here'
            className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
          />
          <input
            type='text'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='Describe your picture here'
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
          />
          <div className='flex flex-col'>
            <div className='mb-2 font-semibold text-lg sm:text-xl'>
              <p>Choose a category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className='outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
              >
                <option value='other' className='bg-white'>
                  Select Category
                </option>
                {categories.map((category, i) => (
                  <option
                    key={i}
                    value={category.name}
                    className='text-base border-0 outline-none capitalize bg-white text-black'
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex justify-end items-end mt-5'>
              <button
                type='button'
                onClick={savePost}
                className='bg-accent text-white font-bold p-2 rounded-full w-28 outline-none'
              >
                Save Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
