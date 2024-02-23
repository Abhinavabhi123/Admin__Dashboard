import { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { orderDatas } from "../../../Services/Constants";
import { TablePagination, TableSortLabel } from "@mui/material";
import { IoMdClose } from "react-icons/io";

export default function OrderTable() {
  const inputRef = useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    setData(
      orderDatas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function handleSort(column) {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) {
        return isAsc ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  }
  function handleSearch(e) {
    const trimmedValue = e.target.value.trim();
    setSearchValue(trimmedValue);
    const filteredData = orderDatas.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(trimmedValue.toLowerCase())
      )
    );
    setData(filteredData);
  }

  function resetSearch() {
    setSearchValue("");
    inputRef.current.value = "";
    handleSearch({ target: { value: "" } });
  }

  return (
    <div>
      <div className="w-full h-20 bg-transparent flex justify-end items-center md:pe-4">
        <div className="flex bg-white justify-center items-center rounded-md px-2 border border-primary">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            ref={inputRef}
            className="focus:outline-none  text-sm py-1"
          />
          {searchValue && (
            <IoMdClose
              size={20}
              className="cursor-pointer transition-all duration-700"
              onClick={resetSearch}
            />
          )}
        </div>
      </div>
      <TableContainer sx={{ borderRadius: "5px" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-primary">
            <TableRow>
              <TableCell align="center">
                {" "}
                <TableSortLabel
                  active
                  direction={orderBy === "Si_no" ? order : "desc"}
                  onClick={() => handleSort("Si_no")}
                >
                  #
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                {" "}
                <TableSortLabel
                  active
                  direction={orderBy === "Order_Id" ? order : "desc"}
                  onClick={() => handleSort("Order_Id")}
                >
                  Order Id
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                {" "}
                <TableSortLabel
                  active
                  direction={orderBy === "Customer_Name" ? order : "desc"}
                  onClick={() => handleSort("Customer_Name")}
                >
                  Customer Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "Image" ? order : "desc"}
                  onClick={() => handleSort("Image")}
                >
                  Image
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                {" "}
                <TableSortLabel
                  active
                  direction={orderBy === "Total" ? order : "desc"}
                  onClick={() => handleSort("Total")}
                >
                  Total
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "Address" ? order : "desc"}
                  onClick={() => handleSort("Address")}
                >
                  Address
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 },height:"10px" }}
              >
                <TableCell align="center">{row.Si_no}</TableCell>
                <TableCell align="center">{row.Order_Id}</TableCell>
                <TableCell align="center">{row.Customer_Name}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center items-center">
                    <img
                      src={row.Image}
                      alt="Product image"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell align="center">{row.Total}</TableCell>
                <TableCell align="center">{row.Address}</TableCell>
                <TableCell align="center">
                  {row.Status ? (
                    <p className="w-fit px-2 text-sm rounded-md bg-green-400">
                      Delivered
                    </p>
                  ) : (
                    <p className="w-fit text-sm px-2 rounded-md bg-orange-300">
                      Pending
                    </p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={orderDatas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
