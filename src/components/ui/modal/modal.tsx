import React, { FunctionComponent, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { getFocusableElements, nextFocus, usePortal } from '@/helpers/utils';
import { cn } from '@/helpers/cn';
import Button from '../button';

const Frame: FunctionComponent<{
  children: React.ReactNode;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  onClose: () => void;
  open?: boolean;
}> = ({
  children,
  closeOnClickOutside = true,
  closeOnEsc = true,
  onClose,
  open = true,
}) => {
  const portal = usePortal();
  const previousFocus = useRef<HTMLElement | null>(null);

  // close on click outside
  const container = useRef<HTMLDivElement>(null);
  const onOverlayClick = (e: React.MouseEvent) => {
    if (!container.current?.contains(e.target as Node)) onClose();
  };

  // close on esc
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case 'Escape': {
          if (closeOnEsc) onClose();
          break;
        }
        case 'Tab': {
          e.preventDefault();
          nextFocus(getFocusableElements(container.current), !e.shiftKey);
          break;
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeOnEsc, onClose, open]);

  useEffect(() => {
    document
      .getElementById('root')
      ?.setAttribute('aria-hidden', open.toString());
    portal.current?.setAttribute('aria-hidden', (!open).toString());

    if (open) {
      previousFocus.current = (document.activeElement as HTMLElement) ?? null;
      nextFocus(getFocusableElements(container.current));
    } else {
      previousFocus.current?.focus?.();
      previousFocus.current = null;
    }
  }, [open, portal]);

  return ReactDOM.createPortal(
    <div
      className={cn(
        'fixed inset-0 z-10 p-8 text-white bg-gray-600/90',
        `${open ? 'visible' : 'invisible'}`,
      )}
      onClick={closeOnClickOutside ? onOverlayClick : undefined}
    >
      <div className="relative w-full max-w-lg mx-auto mt-8" ref={container}>
        <div className="overflow-hidden bg-gray-100 rounded shadow-xl">
          {children}
        </div>
      </div>
    </div>,
    portal.current,
  );
};

const Head: FunctionComponent<{
  children: React.ReactNode;
  onClose: () => void;
}> = ({ children, onClose }) => (
  <div className="flex flex-row justify-between px-4 py-2 bg-gray-300 text-gray-900 z-[100]">
    <h1 className="text-lg font-semibold ">{children}</h1>
    <Button
      buttonVariant="outlined"
      // className=" flex justify-center rounded-full h-8 w-8 bg-gray-400 cursor-pointer shadow-xl outline-none border-2 border-gray-600 focus:border-blue-300"
      onClick={() => onClose()}
      title="Close Modal"
    >
      <span className="text-2xl leading-6 select-none">&times;</span>
    </Button>
  </div>
);

const Body: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => <div className="p-4">{children}</div>;

export const Modal = { Frame, Head, Body };
