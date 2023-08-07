import React from 'react';
import LoginForm from '../components/Login.jsx';

const LoginPage = () => {
  return (
    <div>
      <p className="text-4xl text-yard-red text-center my-8">Welcome Back Bean Sprout!</p>
      <div className=''>
      <LoginForm />
      {/* Other components and content as needed */}
      </div>
    </div>
  );
};

export default LoginPage;