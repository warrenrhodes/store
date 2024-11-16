import type { ButtonHTMLAttributes, FC } from 'react';
import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const PrevBtn: FC<Props> = ({ className = 'w-10 h-10 text-lg', ...args }) => {
  return (
    <button
      type="button"
      className={`PrevBtn ${className} inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-neutral-300`}
      {...args}
    >
      <MdKeyboardArrowLeft className="text-2xl" />
    </button>
  );
};

export default PrevBtn;
