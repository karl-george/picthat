import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import {
  BsCloudDownload,
  BsBookmark,
  BsBookmarkFill,
  BsTrash,
} from 'react-icons/bs';

import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';

const Post = ({ post: { postedBy, image, _id, title, save } }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const user = fetchUser();

  // Double bang to force boolean
  const isBookmarked = !!save?.filter((item) => item.postedBy._id === user?.sub)
    ?.length;

  const bookmarkPost = (id) => {
    if (!isBookmarked) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuid(),
            userId: user?.sub,
            postedBy: {
              _type: 'postedBy',
              _ref: user?.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePost = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className='m-2'>
      <div
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-out'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/post-details/${_id}`)}
      >
        <img
          src={urlFor(image).width(250).url()}
          alt='user post'
          className='rounded-lg w-full'
        />
        {isHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50
            bg-gradient-to-t from-black hover:opacity-75'
          >
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <BsCloudDownload />
                </a>
              </div>

              {postedBy?._id === user?.sub && (
                <button
                  type='button'
                  className='bg-white p-2 opacity-90 hover:opacity-100 font-bold text-base rounded-full hover:shadow-md outline-none'
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost(_id);
                  }}
                >
                  <BsTrash color='red' />
                </button>
              )}

              {isBookmarked ? (
                <button
                  type='button'
                  className='opacity-75 hover:opacity-100 outline-none bg-white p-2 rounded-full hover:shadow-md'
                >
                  <BsBookmarkFill />
                </button>
              ) : (
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    bookmarkPost(_id);
                  }}
                  className='opacity-75 hover:opacity-100 outline-none bg-white p-2 rounded-full hover:shadow-md'
                >
                  <BsBookmark />
                </button>
              )}
            </div>
            <div className='text-white p-2 text-xl'>{title}</div>
          </div>
        )}
      </div>
      <Link
        to={`user/${postedBy?._id}`}
        className='flex flex-row gap-2 mt-1 mb-5 items-center'
      >
        <img
          src={postedBy.image}
          alt='user profile'
          className='w-6 h-6 rounded-full object-cover'
        />
        <p className='text-gray-600 capitalize'>{postedBy.userName}</p>
      </Link>
    </div>
  );
};

export default Post;
