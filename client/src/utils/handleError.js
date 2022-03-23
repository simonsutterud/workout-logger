import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function handleError(errorMsg) {
  toast.configure();

  const run = toast.error(errorMsg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  return (
    <div>
      {() => run()}
      <ToastContainer />
    </div>
  );
}
