import { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Upload from "../../../../../assets/images/upload.png";
import { IoMdClose } from "react-icons/io";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../create.css";
import { imageDataContext } from "../../../../../Pages/AdminPages/Product/CreateProduct";
export default function CreateProductImage() {
  const { handleImageDataChange, submitting } = useContext(imageDataContext);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);
  useEffect(() => {
    handleImageDataChange(files);
  }, [files, handleImageDataChange]);
  
  useEffect(() => {
    if (submitting === true) {
      setFiles([]);
    }
  }, [submitting]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const validatedFiles = acceptedFiles.filter((file) => {
        const isValidFileType = file.type.startsWith("image/");
        const isValidImageType =
          file.name.toLowerCase().endsWith("jpeg") ||
          file.name.toLowerCase().endsWith("jpg") ||
          file.name.toLowerCase().endsWith("png");
        const isValidFileSize = file.size <= 2 * 1024 * 1024;
        if (!isValidFileType) {
          setError("Invalid file type. Please select an image file.");
        } else if (!isValidFileSize) {
          setError(
            "File size exceeds the limit of 2MB. Please select a smaller file."
          );
        } else if (!isValidImageType) {
          setError(
            "Invalid file type. Please select a JPEG, png or JPG image."
          );
          return;
        } else {
          return true;
        }
        return false;
      });

      setFiles((prev) => [...prev, ...validatedFiles]);
    },
  });

  // Function to remove image
  const removeImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newFiles = Array.from(files);
    const [reorderedItem] = newFiles.splice(result.source.index, 1);
    newFiles.splice(result.destination.index, 0, reorderedItem);

  };

  return (
    <div className="w-full md:h-fit bg-transparent flex flex-col items-center">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="w-[80%] md:w-[70%] h-36 bg-slate-200 bg-opacity-50 outline-dotted outline-blue-500 rounded-lg flex flex-col justify-center items-center md:mt-4"
      >
        <input
          {...getInputProps()}
        />
        <img src={Upload} alt="upload image" className="w-14 md:w-20" />
        <p className="w-full text-center text-xs px-2 md:text-sm">
          Drag & Drop some images here, or click here
        </p>
      </div>
      {error && (
        <p className="px-3 text-xs text-center text-red-500 mt-2">{error}</p>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-wrap justify-center mt-4 md:w-[100%] h-[15rem] bg-transparent overflow-y-scroll scrollbar-hide gap-2"
              // className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  mt-4 md:w-[80%] min-h-fit bg-transparent overflow-y-scroll scrollbar-hide gap-2"
            >
              {files.map((file, index) => (
                <Draggable
                  ggable
                  key={index}
                  draggableId={file.name}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex relative rounded-md  z-0 cursor-pointer ${
                        index === 0
                          ? "border-2 border-blue-500"
                          : " border border-gray-300"
                      }  w-24 h-24 p-1`}
                    >
                      <div className="overflow-hidden flex">
                        <img
                          src={URL.createObjectURL(file)}
                          className="block w-auto h-full relative object-cover rounded-md"
                          onLoad={() => {
                            URL.revokeObjectURL(file);
                          }}
                          alt={file.name}
                          draggable
                        />
                        <div
                          className="absolute w-5 h-5 rounded-full right-1 bg-white flex justify-center items-center cursor-pointer"
                          onClick={() => {
                            removeImage(index);
                          }}
                        >
                          <IoMdClose />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
