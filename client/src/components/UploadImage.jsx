import { BiEdit, BiSolidImageAdd } from "react-icons/bi";
import Dropzone from "react-dropzone";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { handleError } from "../functions/toastifyFunctions";

export default function UploadImage({ image, setImage,multiple }) {
  const isImage = image !== null;
  const [imageName, setImageName] = useState("");

  const convertToBase64 = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const acceptedImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];

    if (file && acceptedImageTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImage(reader.result);
        setImageName(file.name);
      };

      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    } else {
      handleError("نوع الملف غير صالح. يرجى تحميل صورة.");
    }
  };

  return (
    <div className="relative">
      {isImage && (
        <div className="flex mt-5 gap-2">
          <Dropzone multiple={false} onDrop={convertToBase64} accept="image/*">
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="cursor-pointer w-full">
                <input {...getInputProps()} accept="image/*" />
                <label
                  htmlFor="image"
                  className="flex items-center gap-3 p-2 border-primary border-2 font-semibold text-primary rounded-md"
                >
                  {!image ? (
                    <>
                      <BiSolidImageAdd size={24} />
                      <span>تحميل أو سحب صورة</span>
                    </>
                  ) : (
                    <>
                      <BiEdit size={24} />
                      <p>{imageName.slice(0, 15)}...</p>
                    </>
                  )}
                </label>
              </div>
            )}
          </Dropzone>
          {image && (
            <button
              onClick={() => setImage("")}
              className="flexCenter text-red-400 border-2 border-red-400 p-2 rounded-md"
            >
              <MdDelete size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
