import React from 'react';

type LoginSectionSignIn4Props = {
  onBackToLogin: () => void;
};

const LoginSectionSignIn4: React.FC<LoginSectionSignIn4Props> = ({ onBackToLogin }) => {
    return (
        <section>
  <div className="flex flex-wrap">
    <div className="w-full lg:w-1/2">
      <div className="flex items-center justify-center w-full h-full">
        <div className="py-12 px-8 mx-auto max-w-md w-full">
          {/* Forgot Password Form */}
          <div className="forgot-password-form">
            <form>
              <p className="uppercase text-rhino-300 text-xs font-bold tracking-widest mb-1 text-center">PASSWORD RECOVERY</p>
              <h1 className="font-heading font-semibold text-4xl text-rhino-700 text-center mb-4">Forgot password?</h1>
              <p className="text-coolGray-500 text-sm text-center mb-8">No worries, enter your email address below and we'll send you a link to reset your password.</p>
              <div className="flex flex-col gap-1 mb-8">
                <label className="text-coolGray-700 text-sm font-medium" htmlFor="forgotEmail">Email Address</label>
                <input className="py-3 px-4 rounded-sm border border-coolGray-200 bg-white w-full outline-none focus:ring-1 ring-indigo-400 forgot-email-input" id="forgotEmail" type="email" placeholder="Enter your email" />
              </div>
              <button className="rounded-sm py-3 px-4 bg-purple-500 shadow-md text-white font-medium text-sm w-full mb-6 block text-center hover:bg-purple-600 transition duration-200 forgot-submit-btn clef-button-primary" type="button">Reset Password</button>
              <button className="flex items-center justify-center gap-2 text-center text-rhino-300 hover:text-rhino-400 text-sm mx-auto clef-icon-button" type="button" onClick={onBackToLogin}>
                <span>&larr;</span>
                <span>Back to sign in</span>
              </button>
            </form>
          </div>
          {/* Reset Email Sent State */}
          <div className="reset-email-sent hidden text-center">
            <div className="flex items-center justify-center mb-6">
              <img className="w-16 h-16 rounded-full" src="https://placehold.co/64x64" alt="Email sent" />
            </div>
            <p className="uppercase text-rhino-300 text-xs font-bold tracking-widest mb-1">CHECK YOUR EMAIL</p>
            <h1 className="font-heading font-semibold text-4xl text-rhino-700 mb-4">Email sent!</h1>
            <p className="text-coolGray-500 text-sm mb-2">We've sent a password reset link to</p>
            <p className="text-rhino-700 text-sm font-semibold mb-8 reset-email-display">your@email.com</p>
            <button className="rounded-sm py-3 px-4 bg-purple-500 shadow-md text-white font-medium text-sm w-full mb-4 block text-center hover:bg-purple-600 transition duration-200 open-email-btn clef-button-primary" type="button">Open email app</button>
            <p className="text-coolGray-500 text-sm mb-6">
              Didn't receive the email?
              <button className="text-purple-500 hover:text-purple-600 font-medium resend-email-btn clef-icon-button" type="button">Click to resend</button>
            </p>
            <button className="flex items-center justify-center gap-2 text-center text-rhino-300 hover:text-rhino-400 text-sm mx-auto clef-icon-button" type="button" onClick={onBackToLogin}>
              <span>&larr;</span>
              <span>Back to sign in</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full lg:w-1/2 relative p-6">
      <img className="rounded-3xl w-full h-full object-cover" src="/coleos-assets/sign-in/bg-image3.png" alt="" />
    </div>
  </div>
</section>


    );
};

export default LoginSectionSignIn4;
