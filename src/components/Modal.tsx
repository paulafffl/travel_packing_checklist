type ModalProps = {
  message: React.ReactNode;
  confirmButton: string;
  confirmIcon: JSX.Element;
  confirmAction: () => void;
  closeAction: () => void;
};

const Modal = ({ message, confirmButton, confirmIcon, confirmAction, closeAction }: ModalProps) => {
  return (
    <div className="modal-style">
      <p>{message}</p>
      <br />
      <div className="mb-2 flex gap-4">
        <button className="flex-grow" onClick={() => closeAction()}>
          Cancel
        </button>
        <button
          className="color-palette-red align-center flex flex-grow"
          onClick={() => {
            confirmAction();
            closeAction();
          }}
        >
          {confirmIcon}
          {confirmButton}
        </button>
      </div>
    </div>
  );
};

export default Modal;
