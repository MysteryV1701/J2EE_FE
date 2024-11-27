import * as React from 'react';

import { useDisclosure } from '@/hooks/use-disclosure';

import Button from '../button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
} from '../drawer';

type FormDrawerProps = {
  isDone: boolean;
  triggerButton: React.ReactElement;
  submitButton: React.ReactElement;
  title: string;
  children: React.ReactNode;
};

export const FormDrawer = ({
  title,
  children,
  isDone,
  triggerButton,
  submitButton,
}: FormDrawerProps) => {
  const { close, open, isOpen } = useDisclosure();

  React.useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          close();
        } else {
          open();
        }
      }}
    >
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent className="flex max-w-1/2 flex-col justify-between sm:max-w-[54rem] bg-gray-100">
        <div className="flex flex-col flex-1">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div>{children}</div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button buttonVariant="outlined" type="submit">
              Close
            </Button>
          </DrawerClose>
          {submitButton}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
