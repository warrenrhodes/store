import React from "react";

interface CustomDialogueProps {
  children: React.ReactNode;
}
const CustomDialogue: React.FC<CustomDialogueProps> = ({ children }) => {
  return (
    <div className="bg-green-200 opacity-50 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white py-12 px-24 border-4 border-sky-500 rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomDialogue;
