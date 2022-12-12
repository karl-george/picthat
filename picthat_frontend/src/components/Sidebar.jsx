import { NavLink, Link } from 'react-router-dom';

import { categories } from '../utils/data';

import logo from '../assets/logo-no-background.png';

const isActiveStyle =
  'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';

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
        <div className='flex flex-col gap-5'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            Discover
          </NavLink>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
