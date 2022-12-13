import Masonry from 'react-masonry-css';
import Post from './Post';

const breakpoints = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ posts }) => {
  return (
    <Masonry breakpointCols={breakpoints} className='flex animate-slide-fwd'>
      {posts?.map((post) => (
        <Post key={post._id} post={post} className='w-max' />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
