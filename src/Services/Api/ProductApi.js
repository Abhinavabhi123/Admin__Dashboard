import { productData } from "../Constants";

export const fetchProductData = async (page, pageSize) => {

    const startIndex = page  * pageSize;
    const endIndex = startIndex + pageSize;
    const data = productData.slice(startIndex, endIndex);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    return {
      data: data,
      total: productData.length,
    };
  };