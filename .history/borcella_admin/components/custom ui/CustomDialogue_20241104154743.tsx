import React, { createContext, useContext, useState } from "react";
import { XCircle } from "lucide-react";
interface CustomDialogueProps {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}
const CustomDialogue: React.FC<CustomDialogueProps> = ({
  children,
  onClose,
  open,
}) => {
  if (!open) return null;
  return (
    <div className="bg-black/20 opacity-50 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-secondary text-primary"
          >
            <XCircle size={20} />
          </button>
          <div className="flex-col justify-center  py-12 px-24 border-4 border-sky-500 rounded-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const DialogContext = createContext({
  openDialog: () => {},
});

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <DialogContext.Provider value={{ openDialog }}>
      <CustomDialogue open={dialogOpen} onClose={closeDialog}>
        {children}
      </CustomDialogue>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
