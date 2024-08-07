import "./contact.css";
import images from "../../../constants/images";
import Title from "../../../components/Title";
import { toast } from "react-toastify";
import url from "../../../constants/url";
import axios from "axios";

import { RiArrowLeftLine } from "react-icons/ri";
import { useState } from "react";
import {
  handleError,
  handleSuccess,
} from "../../../functions/toastifyFunctions";
import Axios from "../../../api";
import { axiosPostWithoutHeader } from "../../../functions/axiosFunctions";

const Contact = () => {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isEmptyName, setIsEmptyName] = useState(false);
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [isEmptySubject, setIsEmptySubject] = useState(false);
  const [isEmptyMessage, setIsEmptyMessage] = useState(false);

  const handleChange = (e) => {
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (
      message.name.length === 0 ||
      message.email.length === 0 ||
      message.subject.length === 0 ||
      message.message.length === 0
    ) {
      setIsEmptyName(message.name.length === 0);
      setIsEmptyEmail(message.email.length === 0);
      setIsEmptySubject(message.subject.length === 0);
      setIsEmptyMessage(message.message.length === 0);

      handleError("جميع الحقول مطلوبة");
    } else {
      try {
        console.log(message);
        console.log({ message });
        const data = await axiosPostWithoutHeader("/mail/send", { message });
        handleSuccess(data.message);
        setMessage({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
  };

  return (
    <section className="contact center bg-bgcolor" id="contact">
      <div className="container-contact box-shadow center">
        <div className="contact-pic" data-tilt>
          <img src={images.contact} alt="IMG" />
        </div>

        <form className="contact-form" onSubmit={handleSend}>
          <Title title={"تواصل معنا"} />

          <div className={`wrap-input1`}>
            <input
              className={`input1 ${isEmptyName ? "border-danger" : "border-0"}`}
              type="text"
              value={message.name}
              onChange={handleChange}
              name="name"
              placeholder="الإسم الكامل"
            />
            <span className="shadow-input1"></span>
          </div>

          <div className={`wrap-input1`}>
            <input
              className={`input1  ${
                isEmptyEmail ? "border-danger" : "border-0"
              }`}
              type="email"
              value={message.email}
              onChange={handleChange}
              name="email"
              placeholder="البريد الإلكتروني"
            />
            <span className="shadow-input1"></span>
          </div>

          <div className={`wrap-input1`}>
            <input
              className={`input1  ${
                isEmptySubject ? "border-danger" : "border-0"
              }`}
              type="text"
              value={message.subject}
              onChange={handleChange}
              name="subject"
              placeholder="العنوان"
            />
            <span className="shadow-input1"></span>
          </div>

          <div className={`wrap-input1`}>
            <textarea
              className={`input1  ${
                isEmptyMessage ? "border-danger" : "border-0"
              }`}
              name="message"
              value={message.message}
              onChange={handleChange}
              placeholder="رسالتك لنا"
            ></textarea>
            <span className="shadow-input1"></span>
          </div>

          <div className="container-contact-form-btn">
            <button className="contact-form-btn center white">
              <span>إرسال</span>
              <RiArrowLeftLine />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
