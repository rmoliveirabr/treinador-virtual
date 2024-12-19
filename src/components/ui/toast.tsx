import { toast, Id } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastOptions {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  button?: {
    text: string;
    onClick: () => void;
    onClose?: () => void;
  };
}

const CustomToast = ({ message, button }: ToastOptions) => {
  const messageLines = message.split('\n');

  return (
    <div className="custom-toast">
      {messageLines.map((line, index) => (
        <div key={index} className="toast-message-line">
          {line}
        </div>
      ))}
      {button && (
        <button className="toast-button" onClick={button.onClick}>
          {button.text}
        </button>
      )}
    </div>
  );
};

export const showToast = ({ message, type, button }: ToastOptions): Id => {
  const toastContent = <CustomToast message={message} button={button} type={type} />;

  return toast(toastContent, {
    type,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose: button?.onClick
  });
};

export const dismissToast = (toastId: Id) => {
  toast.dismiss(toastId);
};
