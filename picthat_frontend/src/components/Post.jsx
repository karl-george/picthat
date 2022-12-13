import { useState } from 'react';
import { Link } from 'react-router-dom';

import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';

const Post = ({ post: { postedBy, image, _id, url, save } }) => {
  const [isHovered, setIsHovered] = useState(false);

  const user = fetchUser();

  return (
    <div className='m-2'>
      <div>
        <img
          src={urlFor(image).width(250).url()}
          alt='user post'
          className='rounded-lg w-full'
        />
      </div>
      <Link
        to={`user/${postedBy?._id}`}
        className='flex flex-row gap-2 mt-1 items-center'
      >
        <img
          src={postedBy.image}
          alt='user profile'
          className='w-8 h-8 rounded-full object-cover'
        />
        <p className='font-semibold capitalize'>{postedBy.userName}</p>
      </Link>
    </div>
  );
};

export default Post;
