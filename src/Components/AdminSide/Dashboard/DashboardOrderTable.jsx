
import { orderData } from "../../../Services/Constants";

export default function DashboardOrderTable() {
  return (
    <div  className="border border-primary overflow-x-auto rounded-md w-full">
      <table className="w-[150%] md:w-full ">
        <thead className="bg-primary h-10">
          <tr>
            <th className="text-center w-36 md:w-0 text-sm md:text-base">Date</th>
            <th className="text-center w-36 md:w-0 text-sm md:text-base">Customer</th>
            <th className="text-center w-36 md:w-0 text-sm md:text-base">Product</th>
            <th className="text-center w-36 md:w-0 text-sm md:text-base">Details</th>
            <th className="text-center w-36 md:w-0 text-sm md:text-base">Price</th>
            <th className="text-center w-36 md:w-0 text-sm md:text-base">Status</th>
          </tr>
        </thead>
        <tbody className="w-full text-xs md:text-sm ">
          {orderData.map((row,i) => (
            <tr
              key={i}
              className="h-12"
            >
              <td align="center">{row.Date}</td>
              <td align="center">
                <div className="flex ps-5 gap-2 items-center">
                  <img src={row.Image} alt="userImage"  className="w-8 h-8 hidden md:block rounded-full"/>
                  <p>{row.Name}</p>
                </div>
              </td>
              <td align="center">
                <div className="flex ps-5  items-center gap-2">
                  <img src={row.ProductImage} alt="userImage" className="w-8 h-8 hidden md:block rounded-full" />
                  <p>{row.Product}</p>
                </div>
              </td>
              <td align="center">{row.Details}</td>
              <td align="center">{row.Price}</td>
              <td className="flex justify-center items-center pt-2"><button className="text-xs bg-[#33cc33] bg-opacity-75 px-2 py-1 rounded-md">Delivered</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
