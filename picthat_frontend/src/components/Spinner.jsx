import { RotatingLines } from 'react-loader-spinner';

const Spinner = ({ msg }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full mt-12'>
      <RotatingLines width={100} strokeColor='#7CB3FF' />
      <p className='text-lg text-center px-2 mt-8'>{msg}</p>
    </div>
  );
};

export default Spinner;
