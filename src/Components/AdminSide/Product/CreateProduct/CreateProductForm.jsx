import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Upload from "../../../../assets/images/upload.png";
import { IoMdClose } from "react-icons/io";
import "./create.css";

export default function CreateProductForm() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const validatedFiles = acceptedFiles.filter((file) => {
        const isValidFileType = file.type.startsWith("image/");
        const isValidImageType =
          file.name.toLowerCase().endsWith("jpeg") ||
          file.name.toLowerCase().endsWith("jpg") ||
          file.name.toLowerCase().endsWith("png");
        const isValidFileSize = file.size <= 5 * 1024 * 1024;
        if (!isValidFileType) {
          setError("Invalid file type. Please select an image file.");
        } else if (!isValidFileSize) {
          setError(
            "File size exceeds the limit. Please select a smaller file."
          );
        } else if (!isValidImageType) {
          setError("Invalid file type. Please select a JPEG, png or JPG image.");
          return; // Or use another method to reject the file
        } else {
          return true;
        }
        return false;
      });

      setFiles((prev) => [...prev, ...validatedFiles]);
    },
  });
  console.log(files, "file");

  // function to remove image
  function removeImage(index) {
    URL.revokeObjectURL(files[index]);
    setFiles((prev) => prev.filter((item, i) => i !== index));
  }
  // display image preview
  const thumbs = files.map((file, i) => (
    <div
      key={i}
      className="inline-flex relative rounded-md border transition-all duration-700 z-0 border-gray-300 w-24 h-24 p-1"
    >
      <div className="overflow-hidden flex">
        <img
          src={URL.createObjectURL(file)}
          className="block w-auto h-full object-cover rounded-md"
          onLoad={() => {
            URL.revokeObjectURL(file);
          }}
          alt={i}
        />
        <div
          className="absolute w-5 h-5 rounded-full right-1 bg-white flex justify-center items-center cursor-pointer"
          onClick={() => {
            removeImage(i);
          }}
        >
          <IoMdClose />
        </div>
      </div>
    </div>
  ));
  return (
    <div className="w-full h-fit bg-transparent flex flex-col md:flex-row">
      {/* Form section */}
      <div className="w-full md:w-1/2 h-[30rem] md:h-full bg-yellow-500 mb-5 md:mb-0"></div>
      {/* Image section */}
      <div className="w-full md:w-1/2 h-1/2 md:h-fit bg-transparent py-8 flex flex-col items-center ">
        <div
          {...getRootProps({ className: "dropzone" })}
          className="w-[60%] h-56 bg-slate-200 outline-dotted outline-blue-500 rounded-lg flex flex-col justify-center items-center md:mt-4"
        >
          <input {...getInputProps()} />
          <img src={Upload} alt="upload image" className="w-14 md:w-20" />
          <p className="w-full text-center text-xs px-2 md:text-sm">
            Drag & Drop some files here, or click here
          </p>
        </div>
        {error && (
          <p className="text-xs px-3 md:text-sm text-center text-red-500 mt-2">
            {error}
          </p>
        )}
        <aside className="  grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  mt-4 md:w-[80%] min-h-fit  bg-transparent overflow-y-scroll  scrollbar-hide gap-2">
          {thumbs}
        </aside>
      </div>
    </div>
  );
}
