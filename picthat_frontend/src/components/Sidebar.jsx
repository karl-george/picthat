import { NavLink, Link } from 'react-router-dom';

import logo from '../assets/logo-no-background.png';

const Sidebar = ({ closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className='flex flex-col justify-start bg-white h-full overflow-y-scroll min-w-200 hide-scrollbar pr-8'>
      <div className='flex flex-col'>
        <Link
          to='/'
          onClick={handleCloseSidebar}
          className='flex px-5 gap-4 my-6 pt-1 w-190 flex-row justify-center items-center'
        >
          <img src={logo} alt='logo' className='w-16' />
          <p className='text-xl md:text-3xl text-accent'>PicThat</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
