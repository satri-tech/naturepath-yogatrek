
import { toast } from "react-toastify";

export const toastSuccess = (success_msg:string) => {
  toast.success(success_msg, {
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