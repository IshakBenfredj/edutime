import { useState } from "react";
import Input from "../components/Input";
import { FaInfo } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import UploadImage from "../components/UploadImage";
import Button from "../components/Button";
import { axiosPostWithHeader } from "../functions/axiosFunctions";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";

export default function AddBlog() {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!image || !text || !title) {
      handleError("جميع الحقول مطلوبة");
      setLoading(false);
      return;
    }
    try {
      await axiosPostWithHeader("/blogs/add", { image, text, title });
      handleSuccess("تم نشر المقال");
      setImage("");
      setTitle("");
      setText("");
    } catch (error) {
      handleError(error.response.data.error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-bgcolor h-screen">
      <div className="container h-full flex items-center justify-center flex-col gap-4">
        <h1 className="md:text-4xl text-2xl font-bold">إضافة مقال</h1>
        <form className="md:w-2/5 w-full space-y-3" onSubmit={handleSubmit}>
          <UploadImage image={image} setImage={setImage} />
          <Input
            set={setTitle}
            state={title}
            label={"عنوان المقال"}
            type={"text"}
            name={"title"}
            Icon={FaInfo}
          />
          <Input
            set={setText}
            state={text}
            label={"نص المقال"}
            type={"text"}
            name={"text"}
            Icon={MdEditNote}
            textarea
          />
          <Button
            text={"نشر المقال"}
            loading={loading}
            loadingText={"جاري النشر"}
          />
        </form>
      </div>
    </div>
  );
}
