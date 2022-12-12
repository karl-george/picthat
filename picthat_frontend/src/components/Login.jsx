import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { client } from '../client';

import logo from '../assets/logo-no-background.png';

const Login = () => {
  const navigate = useNavigate();
  const credentialResponse = (res) => {
    const decode = jwt_decode(res.credential);

    localStorage.setItem('user', JSON.stringify(decode));

    const { name, sub, picture } = decode;

    // Create new sanity document for the user
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}
    >
      <div className='flex flex-col justify-center items-center h-screen shadow-2xl'>
        <img src={logo} alt='Pic That logo' className='w-36 mb-8' />
        <GoogleLogin
          onSuccess={credentialResponse}
          onError={credentialResponse}
          cookiePolicy='single_host_origin'
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
