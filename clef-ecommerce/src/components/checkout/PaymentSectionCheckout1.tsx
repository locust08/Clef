import React from 'react';

const PaymentSectionCheckout1: React.FC = () => {
    return (
        <section className="relative bg-white overflow-hidden">
  <div className="container px-4 mx-auto">
    <div className="flex flex-wrap">
      <div className="w-full lg:w-1/2 xl:w-7/12 px-4 xl:pt-20 xl:pb-32 py-12">
        <div className="max-w-lg mx-auto">
          <h2 className="text-rhino-700 text-3xl font-semibold mb-8 font-heading">Billing address</h2>
          <div className="pb-10 border-b border-coolGray-200 flex flex-col gap-8">
            <div className="flex flex-wrap gap-8">
              <div className="flex-1">
                <label className="block text-coolGray-700 text-sm font-medium mb-2" htmlFor="textInput1">First Name</label>
                <input className="rounded-sm py-3 px-4 border border-coolGray-200 w-full outline-none focus:ring-1 ring-indigo-400" id="textInput1" type="text" placeholder="Enter" />
              </div>
              <div className="flex-1">
                <label className="block text-coolGray-700 text-sm font-medium mb-2" htmlFor="textInput2">Last Name</label>
                <input className="rounded-sm py-3 px-4 border border-coolGray-200 w-full outline-none focus:ring-1 ring-indigo-400" id="textInput2" type="text" placeholder="Enter" />
              </div>
            </div>
            <div>
              <label className="block text-coolGray-700 text-sm font-medium mb-2" htmlFor="textInput3">Username</label>
              <div className="rounded-sm py-3 px-2 border border-coolGray-200 flex">
                <img className="mr-2" src="/coleos-assets/checkout/input-icon.png" alt="" />
                <input className="flex-1 outline-none" id="textInput3" type="text" placeholder="username" />
              </div>
            </div>
            <div>
              <label className="block text-coolGray-700 text-sm font-medium mb-2" htmlFor="textInput4">Address</label>
              <input className="rounded-sm py-3 px-2 border border-coolGray-200 w-full outline-none focus:ring-1 ring-indigo-400" id="textInput4" type="text" placeholder="Enter" />
            </div>
            <div>
              <label className="block text-coolGray-700 text-sm font-medium mb-2" htmlFor="textInput5">Address 2</label>
              <input className="rounded-sm py-3 px-2 border border-coolGray-200 w-full outline-none focus:ring-1 ring-indigo-400" id="textInput5" type="text" placeholder="Enter" />
            </div>
            <div className="flex flex-wrap -mx-4 gap-8 sm:gap-0">
              <div className="w-full sm:w-1/3 px-4">
                <label className="block text-coolGray-700 text-sm font-medium mb-2" htmlFor="textInput6">Country</label>
                <input className="rounded-sm py-3 px-4 border border-coolGray-200 w-full outline-none focus:ring-1 ring-indigo-400" id="textInput6" type="text" placeholder="Enter" />
              </div>
              <div className="w-full sm:w-1/3 px-4">
                <label className="block text-coolGray-700 text-sm font-medium mb-2" htmlFor="textInput7">State</label>
                <input className="rounded-sm py-3 px-4 border border-coolGray-200 w-full outline-none focus:ring-1 ring-indigo-400" id="textInput7" type="text" placeholder="Enter" />
              </div>
              <div className="w-full sm:w-1/3 px-4">
                <label className="block text-coolGray-700 text-sm font-medium mb-2" htmlFor="textInput8">Zip Code</label>
                <input className="rounded-sm py-3 px-4 border border-coolGray-200 w-full outline-none focus:ring-1 ring-indigo-400" id="textInput8" type="text" placeholder="XX-XXX" />
              </div>
            </div>
          </div>
          <div className="py-10 border-b border-coolGray-200 flex flex-col gap-8">
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input className="custom-checkbox-1 opacity-0 absolute z-10 h-5 w-5 top-0 left-0" id="checkbox1" type="checkbox" />
                  <div className="border border-coolGray-200 w-5 h-5 flex justify-center items-center rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="hidden" width={10} height={7} viewBox="0 0 10 7" fill="none">
                      <path d="M9.76764 0.22597C9.45824 -0.0754185 8.95582 -0.0752285 8.64601 0.22597L3.59787 5.13702L1.35419 2.95437C1.04438 2.65298 0.542174 2.65298 0.23236 2.95437C-0.0774534 3.25576 -0.0774534 3.74431 0.23236 4.0457L3.03684 6.77391C3.19165 6.92451 3.39464 7 3.59765 7C3.80067 7 4.00386 6.9247 4.15867 6.77391L9.76764 1.31727C10.0775 1.01609 10.0775 0.52734 9.76764 0.22597Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <label className="block text-gray-700" htmlFor="checkbox1">Shipping address is the same as my billing address</label>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input className="custom-checkbox-1 opacity-0 absolute z-10 h-5 w-5 top-0 left-0" id="checkbox2" type="checkbox" defaultChecked />
                  <div className="border border-coolGray-200 w-5 h-5 flex justify-center items-center rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="hidden" width={10} height={7} viewBox="0 0 10 7" fill="none">
                      <path d="M9.76764 0.22597C9.45824 -0.0754185 8.95582 -0.0752285 8.64601 0.22597L3.59787 5.13702L1.35419 2.95437C1.04438 2.65298 0.542174 2.65298 0.23236 2.95437C-0.0774534 3.25576 -0.0774534 3.74431 0.23236 4.0457L3.03684 6.77391C3.19165 6.92451 3.39464 7 3.59765 7C3.80067 7 4.00386 6.9247 4.15867 6.77391L9.76764 1.31727C10.0775 1.01609 10.0775 0.52734 9.76764 0.22597Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <label className="block text-gray-700" htmlFor="checkbox2">Save this information for next time</label>
              </div>
            </div>
            <div>
              <p className="text-sm text-coolGray-700 font-bold mb-4">Payment</p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex flex-wrap items-center">
                      <input className="custom-checkbox-1 opacity-0 absolute z-10 h-5 w-5 top-0 left-0" id="radioInput1" type="radio" />
                      <div className="border border-coolGray-200 w-5 h-5 flex justify-center items-center rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="hidden" width={10} height={7} viewBox="0 0 10 7" fill="none">
                          <path d="M9.76764 0.22597C9.45824 -0.0754185 8.95582 -0.0752285 8.64601 0.22597L3.59787 5.13702L1.35419 2.95437C1.04438 2.65298 0.542174 2.65298 0.23236 2.95437C-0.0774534 3.25576 -0.0774534 3.74431 0.23236 4.0457L3.03684 6.77391C3.19165 6.92451 3.39464 7 3.59765 7C3.80067 7 4.00386 6.9247 4.15867 6.77391L9.76764 1.31727C10.0775 1.01609 10.0775 0.52734 9.76764 0.22597Z" fill="currentColor" />
                        </svg>
                      </div>
                      <label className="text-coolGray-700 ml-3" htmlFor="radioInput1">Credit Card</label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex flex-wrap items-center">
                      <input className="custom-checkbox-1 opacity-0 absolute z-10 h-5 w-5 top-0 left-0" id="radioInput2" type="radio" />
                      <div className="border border-coolGray-200 w-5 h-5 flex justify-center items-center rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="hidden" width={10} height={7} viewBox="0 0 10 7" fill="none">
                          <path d="M9.76764 0.22597C9.45824 -0.0754185 8.95582 -0.0752285 8.64601 0.22597L3.59787 5.13702L1.35419 2.95437C1.04438 2.65298 0.542174 2.65298 0.23236 2.95437C-0.0774534 3.25576 -0.0774534 3.74431 0.23236 4.0457L3.03684 6.77391C3.19165 6.92451 3.39464 7 3.59765 7C3.80067 7 4.00386 6.9247 4.15867 6.77391L9.76764 1.31727C10.0775 1.01609 10.0775 0.52734 9.76764 0.22597Z" fill="currentColor" />
                        </svg>
                      </div>
                      <label className="text-coolGray-700 ml-3" htmlFor="radioInput2">Debit Card</label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex flex-wrap items-center">
                      <input className="custom-checkbox-1 opacity-0 absolute z-10 h-5 w-5 top-0 left-0" id="radioInput3" type="radio" />
                      <div className="border border-coolGray-200 w-5 h-5 flex justify-center items-center rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="hidden" width={10} height={7} viewBox="0 0 10 7" fill="none">
                          <path d="M9.76764 0.22597C9.45824 -0.0754185 8.95582 -0.0752285 8.64601 0.22597L3.59787 5.13702L1.35419 2.95437C1.04438 2.65298 0.542174 2.65298 0.23236 2.95437C-0.0774534 3.25576 -0.0774534 3.74431 0.23236 4.0457L3.03684 6.77391C3.19165 6.92451 3.39464 7 3.59765 7C3.80067 7 4.00386 6.9247 4.15867 6.77391L9.76764 1.31727C10.0775 1.01609 10.0775 0.52734 9.76764 0.22597Z" fill="currentColor" />
                        </svg>
                      </div>
                      <label className="text-coolGray-700 ml-3" htmlFor="radioInput3">PayPal</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10">
            <div className="flex flex-wrap gap-8 sm:gap-0 -mx-4 mb-8">
              <div className="w-full sm:w-1/2 px-4">
                <label className="block text-coolGray-700 text-sm font-medium mb-2" htmlFor="textInput9">Name on card</label>
                <input className="rounded-sm py-3 px-4 border border-coolGray-200 w-full mb-3 outline-none focus:ring-1 ring-indigo-400" id="textInput9" type="text" placeholder="Enter" />
                <p className="text-coolGray-400 text-xs">Full name as displayed on card</p>
              </div>
              <div className="w-full sm:w-1/2 px-4">
                <label className="block text-coolGray-700 text-sm font-medium mb-2" htmlFor="textInput10">Credit card number</label>
                <input className="rounded-sm py-3 px-4 border border-coolGray-200 w-full outline-none focus:ring-1 ring-indigo-400" id="textInput10" type="text" placeholder="Enter" />
              </div>
            </div>
            <div className="flex flex-wrap gap-8 sm:gap-0 -mx-4">
              <div className="w-full sm:w-1/2 px-4">
                <label className="block text-coolGray-700 text-sm font-medium mb-2" htmlFor="textInput11">Expiration</label>
                <input className="rounded-sm py-3 px-4 border border-coolGray-200 w-full mb-3 outline-none focus:ring-1 ring-indigo-400" id="textInput11" type="text" placeholder="Enter" />
              </div>
              <div className="w-full sm:w-1/2 px-4">
                <label className="block text-coolGray-700 text-sm font-medium mb-2" htmlFor="textInput12">CVC</label>
                <input className="rounded-sm py-3 px-4 border border-coolGray-200 outline-none focus:ring-1 ring-indigo-400" id="textInput12" type="text" placeholder="Enter" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="relative lg:absolute top-0 right-0 h-full w-full lg:w-1/2 xl:w-5/12 px-4 pt-12 pb-24 xl:py-20 bg-purple-500">
    <img className="absolute top-0 left-0" src="/coleos-assets/checkout/summary-bg1.png" alt="" />
    <img className="absolute top-32 right-52" src="/coleos-assets/checkout/summary-bg2.png" alt="" />
    <img className="absolute top-96 left-16" src="/coleos-assets/checkout/summary-bg3.png" alt="" />
    <img className="absolute bottom-0 mb-96 left-0 z-20" src="/coleos-assets/checkout/summary-bg4.png" alt="" />
    <img className="absolute bottom-0 mb-112 left-24" src="/coleos-assets/checkout/summary-bg5.png" alt="" />
    <img className="absolute bottom-0 mb-112 right-20" src="/coleos-assets/checkout/summary-bg6.png" alt="" />
    <img className="absolute bottom-0 right-0" src="/coleos-assets/checkout/summary-bg7.png" alt="" />
    <div className="relative z-50 max-w-lg lg:max-w-sm mx-auto">
      <h2 className="text-white text-3xl font-semibold mb-16 font-heading">Order Summary</h2>
      <div className="p-6 bg-white rounded-xl mb-6">
        <p className="text-rhino-800 text-sm mb-8">Shipping and additional costs are calculated based on values you have entered.</p>
        <div className="flex justify-between py-3 px-4 rounded-sm mb-2 border-b border-coolGray-200 pb-4">
          <p className="uppercase text-xs font-bold text-rhino-300">Order subtotal</p>
          <p className="text-rhino-800 text-xs font-bold">$390.00</p>
        </div>
        <div className="flex justify-between py-3 px-4 rounded-sm mb-2 border-b border-coolGray-200 pb-4">
          <p className="uppercase text-xs font-bold text-rhino-300">Shipping &amp; handling</p>
          <p className="text-rhino-800 text-xs font-bold">$10.00</p>
        </div>
        <div className="flex justify-between py-3 px-4 rounded-sm mb-2 border-b border-coolGray-200 pb-4">
          <p className="uppercase text-xs font-bold text-rhino-300">TAX</p>
          <p className="text-rhino-800 text-xs font-bold">$0.00</p>
        </div>
        <div className="flex justify-between py-3 px-4 rounded-sm mb-8 border-b border-coolGray-200 pb-4">
          <div className="uppercase bg-orange-500 rounded-sm py-1 px-3 text-white text-xs font-bold tracking-widest">Discount</div>
          <p className="text-orange-500 text-xs font-bold">20%</p>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-coolGray-800 text-lg font-semibold">Total</h2>
          <p className="text-purple-500 text-lg font-semibold">$320.00</p>
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl">
        <label className="text-sm text-coolGray-700 font-medium mb-2 block" htmlFor="">Enter promo code</label>
        <div className="flex flex-wrap gap-4 mb-6">
          <input className="flex-1 rounded-sm py-3 px-4 bg-white text-coolGray-700 text-sm border border-coolGray-200 outline-none focus:ring-1 ring-indigo-400" type="text" defaultValue="EASDDGFHGE5423" />
          <a className="inline-block text-sm text-purple-500 font-medium py-3 px-4 rounded-sm border border-purple-500 hover:bg-purple-500 hover:text-white transition duration-200 clef-button-secondary" href="#">Apply</a>
        </div>
        <a className="inline-block w-full px-3 py-4 rounded-sm text-center text-white text-sm font-medium bg-purple-500 hover:bg-purple-600 transition duration-200 clef-button-primary" href="#">Continue to Checkout</a>
      </div>
    </div>
  </div>
</section>


    );
};

export default PaymentSectionCheckout1;