import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Upload from "../../../../assets/images/upload.png";
import { IoMdClose } from "react-icons/io";

export default function CreateProductForm() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const validatedFiles = acceptedFiles.filter((file) => {
      //  console.log(file,"file");
        const isValidFileType = file.type.startsWith("image/");
        const isValidFileSize = file.size <= 10 * 1024 * 1024;
        if (!isValidFileType) {
          setError("Invalid file type. Please select an image file.");
        } else if (!isValidFileSize) {
          setError(
            "File size exceeds the limit. Please select a smaller file."
          );
        } else {
          return true;
        }
        return false;
      });

      setFiles((prev) => [
        ...prev,
        ...validatedFiles.map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
        })),
      ]);
    },
  });

  async function removeImage(index) {
    URL.revokeObjectURL(files[index].preview);
    setFiles((prev) => prev.filter((item, i) => i !== index));
  }

  // console.log(files, "files");
  const thumbs = files.map((file, i) => (
    <div
      key={i}
      className="inline-flex relative rounded-md border transition-all duration-700 border-gray-300 w-24 h-24 p-1"
    >
      <div className="overflow-hidden flex">
        <img
          src={file.preview}
          className="block w-auto h-full object-cover rounded-md"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt={file.preview}
        />
        {/* <div
          className="absolute w-5 h-5 rounded-full right-1 bg-white flex justify-center items-center cursor-pointer"
          onClick={() => {
            removeImage(i);
          }}
        >
          <IoMdClose />
        </div> */}
      </div>
    </div>
  ));
  return (
    <div className="w-full h-full bg-transparent flex flex-col md:flex-row">
      {/* Form section */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-transparent"></div>
      {/* Image section */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-transparent flex flex-col items-center  pt-20">
        <div
          {...getRootProps({ className: "dropzone" })}
          className="w-[70%] h-56 bg-slate-200 outline-dotted outline-blue-500 rounded-lg flex flex-col justify-center items-center"
        >
          <input {...getInputProps()} />
          <img src={Upload} alt="upload image" className="w-14 md:w-20" />
          <p className="w-full text-center text-sm">
            Drag & drop some files here, or click here
          </p>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <aside className="flex flex-row flex-wrap mt-4 w-[70%] justify-center gap-2">
          {thumbs}
        </aside>
      </div>
    </div>
  );
}
