import { useRef, useEffect, useState } from 'react';

type ModalProps = {
  message: React.ReactNode;
  confirmButton: string;
  confirmIcon: JSX.Element;
  confirmColor: string;
  confirmAction: () => void;
  closeAction: () => void;
};

const Modal = ({
  message,
  confirmButton,
  confirmIcon,
  confirmColor,
  confirmAction,
  closeAction,
}: ModalProps) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [modalClosing, setModalClosing] = useState(false);
  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      const listener = keyListenersMap.get(e.key);
      return listener && listener(e);
    }
    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  }, [focusedIndex]);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleTabKey = (e: KeyboardEvent) => {
    if (modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
      ) as NodeListOf<HTMLElement>;

      if (focusableElements.length === 0) return;

      let lastIndex = focusableElements.length - 1;
      let nextIndexToFocus = focusedIndex;

      // Forward navigation
      if (!e.shiftKey) {
        nextIndexToFocus = focusedIndex === lastIndex ? 0 : focusedIndex + 1;
      }
      // Backward navigation
      if (e.shiftKey) {
        nextIndexToFocus = focusedIndex === 0 ? lastIndex : focusedIndex - 1;
      }

      focusableElements[nextIndexToFocus].focus();
      e.preventDefault();
      setFocusedIndex(nextIndexToFocus);
    }
  };

  const keyListenersMap = new Map([
    ['Escape', closeAction],
    ['Tab', handleTabKey],
  ]);

  const handleClosingAnimation = async () => {
    setModalClosing(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Allow time for animation to finish
  };

  const handleCancel = async () => {
    await handleClosingAnimation();
    closeAction();
  };

  const handleConfirm = async () => {
    await handleClosingAnimation();
    confirmAction();
    closeAction();
  };

  return (
    <div
      className={`modal-style ${modalClosing && 'animate-fadeOutDownAndScale'}`}
      ref={modalRef}
      role="alert"
      aria-modal="true"
    >
      {message}
      <br />
      <div className="mb-2 flex gap-4">
        <button className="color-palette-violet flex-grow" onClick={handleCancel}>
          Cancel
        </button>
        <button
          title="Confirm modal action"
          className={`${confirmColor} align-center flex flex-grow`}
          onClick={handleConfirm}
        >
          <span className="mr-1">{confirmIcon}</span>
          {confirmButton}
        </button>
      </div>
    </div>
  );
};

export default Modal;
