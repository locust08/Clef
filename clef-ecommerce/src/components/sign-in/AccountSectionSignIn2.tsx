import React from 'react';

const AccountSectionSignIn2: React.FC = () => {
    return (
        <section className="bg-purple-100 min-h-screen py-12 px-4">
  <div className="max-w-3xl mx-auto">
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="relative bg-rhino-900 px-6 py-10">
        <img className="absolute bottom-0 left-0 w-full h-full mix-blend-color" src="/coleos-assets/sign-in/bg-gradient3.png" alt="" />
        <div className="relative flex flex-col sm:flex-row items-center gap-6">
          <img className="w-24 h-24 rounded-full border-4 border-white object-cover" src="https://placehold.co/96x96" alt="Profile picture" />
          <div className="text-center sm:text-left">
            <p className="uppercase text-purple-200 text-xs font-bold tracking-widest text-opacity-60 mb-1">My Account</p>
            <h1 className="font-heading font-semibold text-3xl text-white">Jane Cooper</h1>
          </div>
        </div>
      </div>
      {/* Account details */}
      <div className="px-6 py-8">
        <h2 className="text-rhino-700 font-heading font-semibold text-xl mb-6">Account Details</h2>
        <div className="space-y-5">
          {/* User name */}
          <div className="flex items-start gap-4">
            <span className="w-32 text-rhino-300 text-sm font-medium uppercase tracking-wide">User name</span>
            <span className="text-rhino-700 font-medium">Jane Cooper</span>
          </div>
          {/* Email */}
          <div className="flex items-start gap-4">
            <span className="w-32 text-rhino-300 text-sm font-medium uppercase tracking-wide">Email</span>
            <span className="text-rhino-700 font-medium">jane.cooper@example.com</span>
          </div>
          {/* Phone number */}
          <div className="flex items-start gap-4">
            <span className="w-32 text-rhino-300 text-sm font-medium uppercase tracking-wide">Phone</span>
            <span className="text-rhino-700 font-medium">+1 (555) 123-4567</span>
          </div>
          {/* Default address */}
          <div className="flex items-start gap-4">
            <span className="w-32 text-rhino-300 text-sm font-medium uppercase tracking-wide">Address</span>
            <span className="text-rhino-700 font-medium">1234 Maple Street, Springfield, IL 62704, USA</span>
          </div>
        </div>
        {/* Edit profile button */}
        <div className="mt-8"><a className="inline-block rounded-sm py-3 px-6 bg-purple-500 shadow-md text-white font-medium text-sm hover:bg-purple-600 transition duration-200 clef-button-primary" href="#">Edit Profile</a></div>
      </div>
      {/* Shortcuts */}
      <div className="px-6 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Order history shortcut */}
          <a className="flex items-center gap-4 p-5 rounded-lg bg-purple-100 hover:bg-purple-200 transition duration-200 clef-link-highlight" href="#">
            <img className="w-12 h-12 rounded-md object-cover" src="https://placehold.co/48x48" alt="Order history" />
            <div>
              <p className="text-rhino-700 font-semibold">Order History</p>
              <p className="text-rhino-300 text-sm">View your past orders</p>
            </div>
          </a>
          {/* Favourite shortcut */}
          <a className="flex items-center gap-4 p-5 rounded-lg bg-purple-100 hover:bg-purple-200 transition duration-200 clef-link-highlight" href="#">
            <img className="w-12 h-12 rounded-md object-cover" src="https://placehold.co/48x48" alt="Favourites" />
            <div>
              <p className="text-rhino-700 font-semibold">Favourites</p>
              <p className="text-rhino-300 text-sm">Your saved items</p>
            </div>
          </a>
        </div>
      </div>
      {/* Logout */}
      <div className="px-6 pb-8 border-t border-coolGray-100 pt-6"><a className="inline-block rounded-sm py-3 px-6 bg-white border border-coolGray-200 shadow-sm text-rhino-700 font-medium text-sm hover:bg-purple-500 hover:text-white hover:border-purple-500 transition duration-200 clef-button-secondary" href="#">Logout</a></div>
    </div>
  </div>
</section>


    );
};

export default AccountSectionSignIn2;