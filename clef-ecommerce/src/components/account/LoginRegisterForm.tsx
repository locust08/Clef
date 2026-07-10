const LoginRegisterForm: React.FC = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="mx-auto max-w-2xl rounded-xl border border-coolGray-200 bg-white p-8">
      <h1 className="font-heading text-3xl font-semibold text-rhino-700 mb-6">Account access</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <input className="rounded-sm border border-coolGray-200 px-4 py-3" placeholder="Email" type="email" />
        <input className="rounded-sm border border-coolGray-200 px-4 py-3" placeholder="Password" type="password" />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="rounded-sm bg-purple-500 px-4 py-3 text-sm font-medium text-white clef-button-primary" type="button">Login</button>
        <button className="rounded-sm border border-coolGray-200 px-4 py-3 text-sm font-medium text-rhino-700 clef-button-secondary" type="button">Register</button>
        <button className="rounded-sm border border-coolGray-200 px-4 py-3 text-sm font-medium text-rhino-700 clef-button-secondary" type="button">Forgot password?</button>
      </div>
    </div>
  </div>
);

export default LoginRegisterForm;
