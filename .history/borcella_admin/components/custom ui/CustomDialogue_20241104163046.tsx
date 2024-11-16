import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XCircle } from "lucide-react";

const DialogBox = ({
  children,
  title,
  open,
}: {
  children: React.ReactNode;
  title?: string;
  open: boolean;
}) => (
  <Dialog.Root open={open}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
      <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
        {title && (
          <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            title
          </Dialog.Title>
        )}
        {children}
        <Dialog.Close asChild>
          <button
            className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
            aria-label="Close"
          >
            <XCircle />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogBox;
