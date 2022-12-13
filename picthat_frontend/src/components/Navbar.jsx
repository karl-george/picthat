import { Link } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';

const Navbar = ({ user }) => {
  return (
    <nav className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className=''>
        <IoMdSearch />
      </div>
    </nav>
  );
};

export default Navbar;
