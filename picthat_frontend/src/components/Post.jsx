import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';

const Post = ({ post: { postedBy, image, _id, url, save } }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const user = fetchUser();

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
        {console.log(isHovered)}
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
