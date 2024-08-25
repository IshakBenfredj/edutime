import { toast } from "react-toastify";

const validatePhoneNumber = (phoneNumber) => {
  const validPatterns = [
    /^\+2135\d{8}$/, // +2135********
    /^\+2136\d{8}$/, // +2136********
    /^\+2137\d{8}$/, // +2137********
    /^05\d{8}$/, // 05********
    /^06\d{8}$/, // 06********
    /^07\d{8}$/, // 07********
  ];

  const isValid = validPatterns.some((pattern) => pattern.test(phoneNumber));

  if (!isValid) {
    toast.error("رقم الهاتف غير صالح. يرجى إدخال رقم صحيح.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  return isValid;
};

export default validatePhoneNumber;
