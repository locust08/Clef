import React from 'react';

const FragranceSectionHeaders3: React.FC = () => {
    return (
        <section className="relative overflow-hidden">
  <nav className="relative">
  </nav>
  <div className="hidden fixed top-0 left-0 bottom-0 w-5/6 max-w-md z-50">
    <div className="fixed inset-0 bg-purple-800 opacity-70" />
    <nav className="relative flex flex-col pt-12 pb-6 px-8 w-full h-full bg-white overflow-y-auto">
      <div className="flex mb-12 items-center">
        <a className="inline-block mr-auto clef-link-highlight" href="/">
          <img className="h-8" src="/coleos-assets/logos/logo-coleos-2.svg" alt="" />
        </a>
        <button className="clef-icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
            <path d="M6 18L18 6M6 6L18 18" stroke="#252E4A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="flex w-full max-w-xs items-center px-6 border border-coolGray-200 rounded-full">
        <input className="h-12 w-full bg-transparent border-0 text-sm text-coolGray-500 placeholder-coolGray-500 outline-none" type="search" placeholder="Search..." />
        <button className="inline-block ml-auto text-coolGray-400 hover:text-rhino-500 clef-icon-button" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" fill="none">
            <path d="M6.33333 11.6667C9.27885 11.6667 11.6667 9.27885 11.6667 6.33333C11.6667 3.38782 9.27885 1 6.33333 1C3.38782 1 1 3.38782 1 6.33333C1 9.27885 3.38782 11.6667 6.33333 11.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.0001 13L10.1001 10.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="py-12 mb-auto">
        <ul className="flex-col">
          <li className="mb-3">
            <a className="group mr-6 inline-flex items-center text-base clef-link-highlight" href="#">
              <span className="mr-2 text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                  <path d="M13.3334 13.3333V12C13.3334 11.2928 13.0525 10.6145 12.5524 10.1144C12.0523 9.61429 11.374 9.33334 10.6667 9.33334H5.33341C4.62617 9.33334 3.94789 9.61429 3.4478 10.1144C2.9477 10.6145 2.66675 11.2928 2.66675 12V13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.99992 6.66667C9.47268 6.66667 10.6666 5.47276 10.6666 4C10.6666 2.52724 9.47268 1.33334 7.99992 1.33334C6.52716 1.33334 5.33325 2.52724 5.33325 4C5.33325 5.47276 6.52716 6.66667 7.99992 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-semibold text-rhino-700">Login</span>
            </a>
          </li>
          <li className="mb-3">
            <a className="group mr-6 inline-flex items-center text-base clef-link-highlight" href="#">
              <span className="mr-2 text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                  <g clipPath="url(#clip0_1208_8162)">
                    <path d="M14.1941 3.07455C13.8536 2.73389 13.4493 2.46365 13.0043 2.27927C12.5594 2.0949 12.0824 2 11.6008 2C11.1191 2 10.6422 2.0949 10.1972 2.27927C9.75224 2.46365 9.34795 2.73389 9.00745 3.07455L8.30078 3.78122L7.59411 3.07455C6.90632 2.38676 5.97347 2.00036 5.00078 2.00036C4.02809 2.00036 3.09524 2.38676 2.40745 3.07455C1.71965 3.76235 1.33325 4.69519 1.33325 5.66788C1.33325 6.64057 1.71965 7.57342 2.40745 8.26122L3.11411 8.96788L8.30078 14.1545L13.4874 8.96788L14.1941 8.26122C14.5348 7.92071 14.805 7.51643 14.9894 7.07145C15.1738 6.62648 15.2687 6.14954 15.2687 5.66788C15.2687 5.18623 15.1738 4.70929 14.9894 4.26431C14.805 3.81934 14.5348 3.41505 14.1941 3.07455V3.07455Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </span>
              <span className="font-semibold text-rhino-700">Favorite</span>
            </a>
          </li>
          <li className="mb-12">
            <a className="inline-flex items-center text-base text-purple-400 hover:text-purple-200 clef-link-highlight" href="#">
              <span className="mr-2 text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={17} viewBox="0 0 18 17" fill="none">
                  <path d="M6.99992 15.3333C7.36811 15.3333 7.66658 15.0349 7.66658 14.6667C7.66658 14.2985 7.36811 14 6.99992 14C6.63173 14 6.33325 14.2985 6.33325 14.6667C6.33325 15.0349 6.63173 15.3333 6.99992 15.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.3334 15.3333C14.7016 15.3333 15.0001 15.0349 15.0001 14.6667C15.0001 14.2985 14.7016 14 14.3334 14C13.9652 14 13.6667 14.2985 13.6667 14.6667C13.6667 15.0349 13.9652 15.3333 14.3334 15.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.66675 1.33334H4.33341L6.12008 10.26C6.18104 10.5669 6.34802 10.8426 6.59178 11.0389C6.83554 11.2351 7.14055 11.3393 7.45341 11.3333H13.9334C14.2463 11.3393 14.5513 11.2351 14.7951 11.0389C15.0388 10.8426 15.2058 10.5669 15.2667 10.26L16.3334 4.66667H5.00008" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-semibold text-rhino-700">Cart</span>
            </a>
          </li>
          <li className="mb-4">
            <a className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight" href="/">
              <span className="mr-2">Home</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                <path d="M8.47315 10.36L12.2398 6.58667C12.3023 6.52469 12.3519 6.45096 12.3857 6.36972C12.4196 6.28848 12.437 6.20134 12.437 6.11333C12.437 6.02533 12.4196 5.93819 12.3857 5.85695C12.3519 5.77571 12.3023 5.70198 12.2398 5.64C12.1149 5.51583 11.9459 5.44614 11.7698 5.44614C11.5937 5.44614 11.4247 5.51583 11.2998 5.64L7.96648 8.94L4.66648 5.64C4.54157 5.51583 4.3726 5.44614 4.19648 5.44614C4.02036 5.44614 3.85139 5.51583 3.72648 5.64C3.66349 5.70174 3.61337 5.77537 3.57904 5.85662C3.54471 5.93787 3.52685 6.02513 3.52648 6.11333C3.52685 6.20154 3.54471 6.28879 3.57904 6.37004C3.61337 6.45129 3.66349 6.52492 3.72648 6.58667L7.49315 10.36C7.55557 10.4277 7.63134 10.4817 7.71568 10.5186C7.80001 10.5556 7.89108 10.5746 7.98315 10.5746C8.07521 10.5746 8.16628 10.5556 8.25062 10.5186C8.33495 10.4817 8.41072 10.4277 8.47315 10.36Z" fill="currentColor" />
              </svg>
            </a>
          </li>
          <li className="mb-4">
            <a className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight" href="#">
              <span className="mr-2">Pages</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                <path d="M8.47315 10.36L12.2398 6.58667C12.3023 6.52469 12.3519 6.45096 12.3857 6.36972C12.4196 6.28848 12.437 6.20134 12.437 6.11333C12.437 6.02533 12.4196 5.93819 12.3857 5.85695C12.3519 5.77571 12.3023 5.70198 12.2398 5.64C12.1149 5.51583 11.9459 5.44614 11.7698 5.44614C11.5937 5.44614 11.4247 5.51583 11.2998 5.64L7.96648 8.94L4.66648 5.64C4.54157 5.51583 4.3726 5.44614 4.19648 5.44614C4.02036 5.44614 3.85139 5.51583 3.72648 5.64C3.66349 5.70174 3.61337 5.77537 3.57904 5.85662C3.54471 5.93787 3.52685 6.02513 3.52648 6.11333C3.52685 6.20154 3.54471 6.28879 3.57904 6.37004C3.61337 6.45129 3.66349 6.52492 3.72648 6.58667L7.49315 10.36C7.55557 10.4277 7.63134 10.4817 7.71568 10.5186C7.80001 10.5556 7.89108 10.5746 7.98315 10.5746C8.07521 10.5746 8.16628 10.5556 8.25062 10.5186C8.33495 10.4817 8.41072 10.4277 8.47315 10.36Z" fill="currentColor" />
              </svg>
            </a>
          </li>
          <li className="mb-4">
            <a className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight" href="/shop/skincare">Products</a>
          </li>
          <li className="mb-4">
            <a className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight" href="#">Blog</a>
          </li>
          <li className="mb-4">
            <a className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight" href="/shop/skincare">Shop</a>
          </li>
          <li>
            <a className="flex items-center text-base font-bold text-rhino-700 hover:text-rhino-400 clef-link-highlight" href="#">Contact</a>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-center text-sm text-coolGray-400">Coleos Shuffle 2026</p>
      </div>
    </nav>
  </div>
  <div className="relative w-full h-40 mt-16 mb-28 md:mb-48">
    <h1 className="absolute left-1/2 transform -translate-x-1/2 text-rhino-700 whitespace-nowrap font-bold text-10xl">
      <span>AWAKEN</span>
      <span className="text-rhino-200">.</span>
      <span className="text-orange-500">YOUR</span>
      <span className="text-rhino-200">.</span>
      <span>RITUAL</span>
      <span className="text-rhino-200">.</span>
      <span>DAILY</span>
    </h1>
  </div>
  <div className="p-6">
    <div className="w-full relative" style={{height: 480}}>
      <div className="absolute left-1/2 -top-16 transform -translate-x-1/2 z-50">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width={128} height={129} viewBox="0 0 128 129" fill="none">
            <path d="M127.008 63.2376L110.511 54.1196C109.185 53.3894 108.724 51.7116 109.509 50.4126L119.234 34.2863C120.019 32.9872 119.423 31.9328 117.88 31.959L99.0269 32.3105C97.5095 32.3377 96.2906 31.1201 96.3178 29.6045L96.6697 10.7731C96.6969 9.23122 95.6675 8.63602 94.3398 9.42054L78.1952 19.1068C76.8946 19.8913 75.2159 19.4583 74.484 18.1057L65.3557 1.62781C64.6247 0.302464 63.4057 0.302464 62.6738 1.62781L53.5454 18.1057C52.8144 19.4311 51.1347 19.8913 49.8342 19.1068L33.6634 9.39341C32.3628 8.60889 31.3073 9.20408 31.3335 10.7459L31.6854 29.5773C31.7126 31.093 30.4937 32.3105 28.9763 32.2834L10.1236 31.9319C8.60624 31.9047 7.98409 32.9329 8.76951 34.2591L18.4939 50.3855C19.2793 51.6846 18.8458 53.3614 17.4917 54.0924L0.995124 63.2105C-0.331734 63.9406 -0.331734 65.1582 0.995124 65.8893L17.4917 75.0074C18.8186 75.7375 19.2793 77.4154 18.4939 78.7143L8.76951 94.8669C7.98409 96.166 8.57996 97.2204 10.1236 97.1942L28.9763 96.8427C30.4937 96.8155 31.7125 98.0331 31.6854 99.5487L31.3335 118.38C31.3063 119.922 32.3357 120.517 33.6634 119.733L49.808 110.019C51.1086 109.235 52.7873 109.668 53.5192 111.02L62.6475 127.498C63.3785 128.824 64.5975 128.824 65.3294 127.498L74.4578 111.02C75.1888 109.695 76.8685 109.235 78.1689 110.019L94.3135 119.733C95.6141 120.517 96.6697 119.922 96.6435 118.38L96.2916 99.5487C96.2644 98.0331 97.4833 96.8155 99.0006 96.8427L117.853 97.1942C119.371 97.2213 119.993 96.1931 119.207 94.8669L109.483 78.7405C108.698 77.4414 109.131 75.7646 110.485 75.0336L126.982 65.9155C128.335 65.1582 128.335 63.9678 127.008 63.2376Z" fill="#7573F9" />
          </svg>
          <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl -rotate-12 font-medium text-center">-30% OFF</h2>
        </div>
      </div>
      <img className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl" src="/coleos-assets/headers/bg-image3.png" alt="" />
      <div className="absolute bottom-0 left-0 pb-8 lg:pb-16 px-8 lg:px-24 w-full">
        <div className="flex flex-col items-start">
          <h2 className="text-rhino-700 font-heading font-semibold text-3xl mb-7">CLEF Fragrance awakens your sense of ritual.</h2>
          <p className="text-rhino-700 mb-8">Do a little extra something in daily life. Dress up, wrap a gift, or wear a scent that makes ordinary moments feel alive.</p>
          <div className="flex justify-between flex-wrap w-full gap-4">
            <div className="py-3 px-4 rounded-sm border border-rhino-300 border-dashed text-center text-rhino-700 text-sm font-bold">LIVE A LITTLE</div>
            <a className="py-3 px-4 rounded-sm bg-white flex items-center justify-center gap-2 group hover:bg-pink-500 transition duration-200 clef-button-primary" href="/shop/fragrance/rose-collection">
              <span className="text-pink-500 text-sm font-bold group-hover:text-white transition duration-200">Explore Rose Collection</span>
              <div className="text-pink-500 group-hover:text-white transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <path d="M7.19727 17.3032L17.0968 7.40373" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.8028 6.69673C17.8729 6.76672 17.929 6.84939 17.9678 6.93999C18.0067 7.0306 18.0275 7.12735 18.0291 7.22469L18.1717 15.2078C18.1752 15.4043 18.1004 15.5915 17.9639 15.728C17.8274 15.8645 17.6403 15.9392 17.4438 15.9357C17.2472 15.9322 17.0573 15.8507 16.9159 15.7093C16.7744 15.5678 16.693 15.3779 16.6895 15.1814L16.5601 7.93939L9.31812 7.81007C9.12156 7.80657 8.93167 7.72513 8.79021 7.58367C8.64875 7.44221 8.56731 7.25232 8.5638 7.05576C8.5603 6.85921 8.63502 6.6721 8.77153 6.53559C8.90803 6.39909 9.09514 6.32436 9.29169 6.32787L17.2748 6.4704C17.3722 6.472 17.4689 6.49281 17.5595 6.53165C17.6501 6.57049 17.7328 6.6266 17.8028 6.69673Z" fill="currentColor" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    );
};

export default FragranceSectionHeaders3;
