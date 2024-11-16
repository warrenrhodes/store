'use client';

import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

import NavMobile from './NavMobile';

export interface MenuBarProps {}
const MenuBar: React.FC<MenuBarProps> = () => {
  const [isVisable, setIsVisable] = useState(false);

  const handleOpenMenu = () => setIsVisable(true);
  const handleCloseMenu = () => setIsVisable(false);

  const renderContent = () => {
    return (
      <Transition appear show={isVisable} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={handleCloseMenu}
        >
          <div className="z-max fixed inset-y-0 left-0 w-full max-w-md outline-none focus:outline-none md:w-auto">
            <Transition.Child
              as={Fragment}
              enter="transition duration-100 transform"
              enterFrom="opacity-0 -translate-x-14"
              enterTo="opacity-100 translate-x-0"
              leave="transition duration-150 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-14"
            >
              <div className="relative z-20">
                <NavMobile onClickClose={handleCloseMenu} />
              </div>
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter=" duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave=" duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-neutral-900/60" />
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenMenu}
        className="flex items-center justify-center rounded-lg p-2.5 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {renderContent()}
    </>
  );
};

export default MenuBar;
