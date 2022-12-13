import { Link, Navigate, useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';

const Navbar = ({ user, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <nav className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
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
    </nav>
  );
};

export default Navbar;
