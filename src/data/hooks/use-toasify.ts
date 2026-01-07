import { toast, type ToastOptions, type TypeOptions } from "react-toastify";

const ERROR_TOAST_ID = "error-toast";

export function useToast() {
  const defaultOptions: ToastOptions = {
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  function show(
    message: string,
    type: TypeOptions = "default",
    options?: ToastOptions
  ) {
    toast.dismiss();
    toast(message, { ...defaultOptions, type, ...options });
  }

  function success(message: string, options?: ToastOptions) {
    show(message, "success", options);
  }

  function error(message: string, options?: ToastOptions) {
    if (!toast.isActive(ERROR_TOAST_ID)) {
      toast(message, {
        ...defaultOptions,
        type: "error",
        toastId: ERROR_TOAST_ID,
        ...options,
      });
    }
  }

  function info(message: string, options?: ToastOptions) {
    show(message, "info", options);
  }

  function warn(message: string, options?: ToastOptions) {
    show(message, "warning", options);
  }

  return { show, success, error, info, warn };
}
