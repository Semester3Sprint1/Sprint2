import { toast, Flip, Bounce } from "react-toastify";

const toastProps = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Bounce,
};

const successToast = (message) => {
  toast.success(message, toastProps);
};

const errorToast = (message) => {
  toast.error(message, toastProps);
};

const infoToast = (message) => {
  toast.info(message, toastProps);
};

export { successToast, errorToast, infoToast };
