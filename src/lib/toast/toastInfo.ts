import { toast } from "react-toastify";

export const toastInfo = (info_mssg:string) => {
  toast.info(info_mssg, {
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
