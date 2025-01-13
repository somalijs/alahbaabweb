import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function ModalBox({
  children,
  desc,
  title,
  call,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  desc: string;
  title: string;
  call: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>{call}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] px-5 w-[95%] capitalize">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          {/* Button to close the dialog */}
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
