import { useState } from 'react';

import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';

const Post = ({ post: { postedBy, image, _id, url, save } }) => {
  const [isHovered, setIsHovered] = useState(false);

  const user = fetchUser();

  return (
    <div className='m-2'>
      <div>
        <img src={urlFor(image).width(250).url()} />
      </div>
    </div>
  );
};

export default Post;
