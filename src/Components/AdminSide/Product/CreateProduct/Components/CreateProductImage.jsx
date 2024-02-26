import { useContext, useEffect, useState } from "react";
import "../create.css";
import { useDropzone } from "react-dropzone";
import Upload from "../../../../../assets/images/upload.png";
import { IoMdClose } from "react-icons/io";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { imageDataContext } from "../../../../../Pages/AdminPages/Product/CreateProduct";
import {
  deleteUploadedImage,
  productImageUpload,
} from "../../../../../Services/Axios/Api/ClientApi";
import CloudUpload from "../../../../../assets/cloud-upload-animated.gif";

export default function CreateProductImage() {
  // const { errors,handleBlur,touched } = Props;
  const { errors, handleBlur, submitting, setFieldValue, touched } =
    useContext(imageDataContext);

  const [files, setFiles] = useState([]);
  const [localStorageImage, setLocalStorageImage] = useState([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  useEffect(() => {
    if (submitting === true) {
      setFiles([]);
    }
  }, [submitting]);
  
  useEffect(() => {
    if (files.length > 0) {
      setFieldValue(
        "files",
        files.map((item) => item.FileUrl)
      );
    }
  }, [error, files, setFieldValue]);

 

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const localData = localStorage.getItem("Product Image");
    if (localData) {
      const parsedLocalData = JSON.parse(localData);
      Promise.all(
        parsedLocalData.map(async (item) => {
          await deleteUploadedImage({ fileNames: [item] });
        })
      );
      setFiles([])
      localStorage.removeItem("Product Image");
    }
  }, [isTabVisible]);

  const { getRootProps, getInputProps } = useDropzone({
    // accept: "image/*",
    onDrop: async (acceptedFiles) => {
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
            "Invalid file type. Please select a JPEG, png, or JPG image."
          );
          return;
        } else {
          return true;
        }
        return false;
      });

      if (validatedFiles) {
        let uploadedFilenames = [];
        const imagePublicUrls = [];
        await Promise.all(
          validatedFiles.map(async (item) => {
            try {
              setUploading(true);
              const response = await productImageUpload({ imageFiles: item });
              console.log("Image upload response:", response);
              if (response.status === 200) {
                setFiles((prev) => [...prev, response.data.FileDetails[0]]);
                uploadedFilenames.push(response.data.FileDetails[0].Filename);
                imagePublicUrls.push(response.data.FileDetails[0].FileUrl);
              }
            } catch (error) {
              console.error("Error uploading images:", error);
              setError("Error uploading images. Please try again.");
            } finally {
              setUploading(false);
            }
          })
        );
        setFieldValue("files", imagePublicUrls);
        setLocalStorageImage((prev) => {
          createLocalStorage([...prev, ...uploadedFilenames]);
          return [...prev, ...uploadedFilenames];
        });
      }
    },
  });

  function createLocalStorage(data) {
    localStorage.setItem("Product Image", JSON.stringify(data));
    const localData = localStorage.getItem("Product Image");
    if (localData === "[]") {
      localStorage.removeItem("Product Image");
    }
  }
  // console.log(localStorageImage, "local");

  // Function to remove image
  const removeImage = async (index, fileName) => {
    await deleteUploadedImage({ fileNames: [fileName] })
      .then((response) => {
        if (response.status === 200) {
          const updatedFiles = [...files];
          updatedFiles.splice(index, 1);
          setFiles(updatedFiles);
          const filteredImages = localStorageImage.filter(
            (image) => image !== fileName
          );
          createLocalStorage(filteredImages);
          setLocalStorageImage(filteredImages);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newFiles = Array.from(files);
    const [reorderedItem] = newFiles.splice(result.source.index, 1);
    newFiles.splice(result.destination.index, 0, reorderedItem);
    setFiles(newFiles);
  };

  return (
    <div className="w-full md:h-fit bg-transparent flex flex-col items-center">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="w-[80%] md:w-[70%] h-36 bg-slate-200 bg-opacity-50 outline-dotted outline-blue-500 rounded-lg flex flex-col justify-center items-center md:mt-4"
      >
        <input
          {...getInputProps()}
          name="files"
          id="files"
          onBlur={handleBlur}
        />
        {!uploading ? (
          <img src={Upload} alt="upload image" className="w-14 md:w-20" />
        ) : (
          <img
            src={CloudUpload}
            alt="upload animated"
            className=" w-14 md:w-20 bg-blend-multiply"
          />
        )}
        <p className="w-full text-center text-xs px-2 md:text-sm">
          Drag & Drop some images here, or click here
        </p>
      </div>
      {error && (
        <p className="px-3 text-xs text-center text-red-500 mt-2">{error}</p>
      )}
      {errors.files && touched.files && (
        <p className="px-3 text-xs text-center text-red-500 mt-2">
          {errors.files}
        </p>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-wrap justify-center mt-4 md:w-[100%] max-h-[15rem] overflow-y-scroll scrollbar-hide gap-2"
            >
              {files.map((file, index) => (
                <Draggable
                  key={file.Filename}
                  draggableId={file.Filename}
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
                          src={file.FileUrl}
                          className="block w-auto h-full relative object-cover rounded-md"
                          alt={"Product Image"}
                          draggable
                        />
                        <div
                          className="absolute w-5 h-5 rounded-full right-1 bg-white flex justify-center items-center cursor-pointer"
                          onClick={() => {
                            removeImage(index, file.Filename);
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
