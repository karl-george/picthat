import { Link, useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  return (
    <nav className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <Link to='create-post' className='bg-accent text-white rounded-lg p-3'>
        Create
      </Link>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className='ml-1' />
        <input
          type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className='p-2 w-full bg-white outline-none'
        />
      </div>
      <Link to={`user/${user?._id}`} className='md:block hidden'>
        <img
          src={user?.image}
          alt='user icon'
          className='w-14 h-12 rounded-lg'
        />
      </Link>
    </nav>
  );
};

export default Navbar;
