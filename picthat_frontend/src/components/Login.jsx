import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import logo from '../assets/logo-no-background.png';

const Login = () => {
  const credentialResponse = (res) => {
    console.log(res);
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
