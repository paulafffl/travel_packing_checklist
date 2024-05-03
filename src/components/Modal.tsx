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
  return (
    <div className="modal-style">
      {message}
      <br />
      <div className="mb-2 flex gap-4">
        <button className="color-palette-violet flex-grow" onClick={() => closeAction()}>
          Cancel
        </button>
        <button
          title="Confirm modal action"
          className={`${confirmColor} align-center flex flex-grow`}
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
