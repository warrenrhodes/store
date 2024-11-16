import React, { createContext, useContext, useState } from "react";

interface CustomDialogueProps {
  children: React.ReactNode;
  onClose: () => void;
}
const CustomDialogue: React.FC<CustomDialogueProps> = ({
  children,
  onClose,
}) => {
  return (
    <div className="bg-black/20 opacity-50 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white py-12 px-24 border-4 border-sky-500 rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomDialogue;

import Dialog from "./Dialog";

const DialogContext = createContext();

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({});

  const openDialog = ({ title, message }) => {
    setDialogConfig({ title, message });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogConfig({});
  };

  return (
    <DialogContext.Provider value={{ openDialog }}>
      {children}
      <CustomDialogue
        children={children}
        open={dialogOpen}
        onClose={closeDialog}
      />
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
