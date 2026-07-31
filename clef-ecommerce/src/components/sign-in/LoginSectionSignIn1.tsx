import { useRouter } from 'next/router';
import React from 'react';
import { useCustomer } from '../../context/CustomerContext';

type LoginSectionSignIn1Props = {
  mode: 'login' | 'register';
  onBackToLogin: () => void;
  onForgotPassword: () => void;
  onRegister: () => void;
};

const LoginSectionSignIn1: React.FC<LoginSectionSignIn1Props> = ({
  mode,
  onBackToLogin,
  onForgotPassword,
  onRegister,
}) => {
  const router = useRouter();
  const { customerError, login, register } = useCustomer();
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [registerForm, setRegisterForm] = React.useState({
    acceptsTerms: true,
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
  });
  const [message, setMessage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const returnUrl =
    typeof router.query.returnUrl === 'string' &&
    router.query.returnUrl.startsWith('/')
      ? router.query.returnUrl
      : '/account';

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      await login(loginEmail, loginPassword, returnUrl);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to log in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      await register(
        {
          acceptsTerms: registerForm.acceptsTerms,
          confirmPassword: registerForm.confirmPassword,
          email: registerForm.email,
          firstName: registerForm.firstName,
          lastName: registerForm.lastName,
          password: registerForm.password,
          phone: registerForm.phone,
        },
        returnUrl,
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Unable to create account.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateRegisterForm = (
    field: keyof typeof registerForm,
    value: string | boolean,
  ) => {
    setRegisterForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const changeView = (callback: () => void) => {
    setMessage(null);
    callback();
  };

  return (
    <section className="relative overflow-hidden py-12">
      <img
        className="absolute bottom-0 left-0 h-full w-full bg-opacity-50"
        src="/coleos-assets/sign-in/bg-gradient2.png"
        alt=""
      />
      <div className="container mx-auto px-4">
        <div className="relative z-50 flex flex-wrap justify-center -mx-4">
          {mode === 'login' && (
            <div className="w-full p-4 lg:w-1/2">
              <div className="rounded-lg bg-rhino-900 px-4 py-10 md:px-8">
                <form onSubmit={handleLogin}>
                <h2 className="mb-8 font-heading text-2xl font-semibold text-white">
                  Login
                </h2>
                <div className="mb-4 flex flex-col gap-1">
                  <label className="text-sm font-medium text-white" htmlFor="loginEmail">
                    E-Mail Address
                  </label>
                  <input
                    autoComplete="email"
                    className="rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                    id="loginEmail"
                    onChange={(event) => setLoginEmail(event.target.value)}
                    placeholder="example@gmail.com"
                    required
                    type="email"
                    value={loginEmail}
                  />
                </div>
                <div className="mb-8 flex flex-col gap-1">
                  <label className="text-sm font-medium text-white" htmlFor="loginPassword">
                    Password
                  </label>
                  <input
                    autoComplete="current-password"
                    className="rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                    id="loginPassword"
                    onChange={(event) => setLoginPassword(event.target.value)}
                    placeholder="Password"
                    required
                    type="password"
                    value={loginPassword}
                  />
                </div>
                <div className="mb-8 flex items-center gap-4">
                  <input
                    className="h-5 w-5 rounded-sm border-coolGray-200 accent-purple-600"
                    id="loginTerms"
                    required
                    type="checkbox"
                  />
                  <label className="block text-sm text-white" htmlFor="loginTerms">
                    I agree with this website handling my account session.
                  </label>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button
                    className="rounded-sm bg-purple-500 px-4 py-3 text-sm font-medium text-white transition duration-200 hover:bg-purple-600 disabled:bg-purple-300 clef-button-primary"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </button>
                  <button
                    className="rounded-sm bg-white px-4 py-3 text-sm font-medium text-coolGray-700 shadow-md transition duration-200 hover:bg-purple-500 hover:text-white clef-button-primary"
                    onClick={() => changeView(onRegister)}
                    type="button"
                  >
                    Register
                  </button>
                  <button
                    className="ml-auto rounded-sm bg-white px-4 py-3 text-sm font-medium text-coolGray-700 shadow-md transition duration-200 hover:bg-purple-500 hover:text-white clef-button-primary"
                    onClick={() => changeView(onForgotPassword)}
                    type="button"
                  >
                    Forgot password?
                  </button>
                </div>
                </form>
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div className="w-full p-4 lg:w-1/2">
              <div className="rounded-lg bg-rhino-900 px-4 py-10 md:px-8">
                <form onSubmit={handleRegister}>
                <h2 className="mb-8 font-heading text-2xl font-semibold text-white">
                  Register
                </h2>
                <div className="mb-4 flex flex-col gap-1">
                  <label className="text-sm font-medium text-white" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    autoComplete="given-name"
                    className="rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                    id="firstName"
                    onChange={(event) => updateRegisterForm('firstName', event.target.value)}
                    placeholder="Enter name"
                    required
                    type="text"
                    value={registerForm.firstName}
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label className="text-sm font-medium text-white" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    autoComplete="family-name"
                    className="rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                    id="lastName"
                    onChange={(event) => updateRegisterForm('lastName', event.target.value)}
                    placeholder="Enter"
                    required
                    type="text"
                    value={registerForm.lastName}
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label className="text-sm font-medium text-white" htmlFor="registerEmail">
                    E-Mail Address
                  </label>
                  <input
                    autoComplete="email"
                    className="rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                    id="registerEmail"
                    onChange={(event) => updateRegisterForm('email', event.target.value)}
                    placeholder="example@gmail.com"
                    required
                    type="email"
                    value={registerForm.email}
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label className="text-sm font-medium text-white" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    autoComplete="tel"
                    className="rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                    id="phone"
                    onChange={(event) => updateRegisterForm('phone', event.target.value)}
                    placeholder="Optional"
                    type="tel"
                    value={registerForm.phone}
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label className="text-sm font-medium text-white" htmlFor="registerPassword">
                    Password
                  </label>
                  <input
                    autoComplete="new-password"
                    className="rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                    id="registerPassword"
                    minLength={8}
                    onChange={(event) => updateRegisterForm('password', event.target.value)}
                    placeholder="Password"
                    required
                    type="password"
                    value={registerForm.password}
                  />
                </div>
                <div className="mb-6 flex flex-col gap-1">
                  <label className="text-sm font-medium text-white" htmlFor="confirmPassword">
                    Confirm password
                  </label>
                  <input
                    autoComplete="new-password"
                    className="rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                    id="confirmPassword"
                    minLength={8}
                    onChange={(event) => updateRegisterForm('confirmPassword', event.target.value)}
                    placeholder="Password"
                    required
                    type="password"
                    value={registerForm.confirmPassword}
                  />
                </div>
                <div className="mb-6 flex items-center gap-4">
                  <input
                    checked={registerForm.acceptsTerms}
                    className="h-5 w-5 rounded-sm border-coolGray-200 accent-purple-600"
                    id="registerTerms"
                    onChange={(event) => updateRegisterForm('acceptsTerms', event.target.checked)}
                    required
                    type="checkbox"
                  />
                  <label className="block text-sm text-white" htmlFor="registerTerms">
                    I agree with this website handling my account data.
                  </label>
                </div>
                <button
                  className="block w-full rounded-sm bg-purple-500 px-4 py-3 text-center text-sm font-medium text-white transition duration-200 hover:bg-purple-600 disabled:bg-purple-300 clef-button-primary"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'Creating account...' : 'Create Account'}
                </button>
                <button
                  className="mx-auto mt-6 block text-sm font-medium text-white transition duration-200 hover:text-purple-300 clef-icon-button"
                  onClick={() => changeView(onBackToLogin)}
                  type="button"
                >
                  Back to Login
                </button>
                </form>
              </div>
            </div>
          )}
        </div>
        {(message || customerError) && (
          <div className="relative z-50 mx-4 mt-4 rounded-sm bg-white p-4 text-sm text-rhino-600">
            {message ?? customerError}
          </div>
        )}
      </div>
    </section>
  );
};

export default LoginSectionSignIn1;
