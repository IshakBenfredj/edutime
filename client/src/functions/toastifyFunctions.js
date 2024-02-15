import { toast } from "react-toastify";

export const handleError = (err) =>
  toast.error(err, {
    position: "top-left",
  });

export const handleSuccess = (msg) =>
  toast.success(msg, {
    position: "top-right",
  });