import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import LoginSectionCustomComponents2 from '../components/custom-components/LoginSectionCustomComponents2';
import LoginSectionSignIn1 from '../components/sign-in/LoginSectionSignIn1';
import LoginSectionSignIn4 from '../components/sign-in/LoginSectionSignIn4';
import LoginSectionFooters5 from '../components/footers/LoginSectionFooters5';

const Login: React.FC = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    // Load custom component scripts after React components are mounted
    const script1 = document.createElement('script');
    script1.src =
      '/js/1298507.js?v=1782961831';
    script1.async = true;
    document.head.appendChild(script1);
  }, []);

  return (
    <>
      <Head>
        <title></title>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/shuffle-for-tailwind.png'
        />
      </Head>
      <LoginSectionCustomComponents2 />
      {showForgotPassword ? (
        <LoginSectionSignIn4 onBackToLogin={() => setShowForgotPassword(false)} />
      ) : (
        <LoginSectionSignIn1 onForgotPassword={() => setShowForgotPassword(true)} />
      )}
      <LoginSectionFooters5 />
    </>
  );
};

export default Login;
