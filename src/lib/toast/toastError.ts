import { toast } from "react-toastify";

export const toastError = (error_mssg:string) => {
  toast.error(error_mssg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};
