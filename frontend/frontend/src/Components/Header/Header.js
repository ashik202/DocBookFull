
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import image from '../../Images/logo.png'

import './header.css'
import { Link } from "react-router-dom";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <nav className=" nav-bar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              
                
                <div className="flex my-4">
                  <img
                    className="h-10 w-18"
                    src={image} alt=""
                    
                  />
                </div>
                <div className="hidden md:block ">
                  <div className="ml-10 flex items-baseline space-x-10 my-4">
                    <a
                      href="/"
                      className="text-black  hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Book Apoinment
                    </a>
  
                    <Link to="userlogin"
                      
                      className="text-black  hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login|Singup
                    </Link>
  
                   
                  </div>
                </div>
                
              
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
  
          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div className="md:hidden" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <a
                    href="/"
                    className="hover:bg-blue-700 hover:text-white text-black block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Book Apoinment
                  </a>
  
                  <a
                    href="/"
                    className="hover:bg-blue-700 hover:text-white text-black block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login|Singup
                  </a>
  
                  
                </div>
              </div>
            )}
          </Transition>
        </nav>
  
       
       
      </div>
  )
}
export default Header