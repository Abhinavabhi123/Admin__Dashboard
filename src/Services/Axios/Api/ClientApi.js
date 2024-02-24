import { axiosInstance } from "../instance";

export const productImageUpload = (data) => {
  return axiosInstance.post("/UploadImages", data, {
    headers: {
      Token: import.meta.env.VITE_TOKEN,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUploadedImage=(data)=>{
  console.log(data,"data");
  return axiosInstance.delete("/DeleteImages",{
    headers:{
      Token: import.meta.env.VITE_TOKEN,
      "Content-Type":"application/json"
    },
    data: JSON.stringify(data)
  })
}
