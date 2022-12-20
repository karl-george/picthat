import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  Navbar,
  Posts,
  PostDetails,
  CreatePost,
  Search,
  UserProfile,
} from '../components/index.js';

const Wall = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar
          user={user}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/category/:categoryId' element={<Posts />} />
          <Route
            path='/post-details/:postId'
            element={<PostDetails user={user} />}
          />
          <Route path='/create-post' element={<CreatePost user={user} />} />
          <Route path='/search' element={<Search searchTerm={searchTerm} />} />
          <Route path='/user/:userId' element={<UserProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Wall;
