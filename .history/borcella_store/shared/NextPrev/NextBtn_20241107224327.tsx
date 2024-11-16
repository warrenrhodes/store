import type { ButtonHTMLAttributes, FC } from 'react';
import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const NextBtn: FC<Props> = ({ className = 'w-10 h-10 text-lg', ...args }) => {
  return (
    <button
      type="button"
      className={`NextBtn ${className} inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-neutral-300`}
      {...args}
    >
      <MdKeyboardArrowRight className="text-2xl" />
    </button>
  );
};

export default NextBtn;
