import { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { userData } from "../../../Services/Constants";
import TablePagination from "@mui/material/TablePagination";
import { BsCurrencyDollar } from "react-icons/bs";
import TableSortLabel from "@mui/material/TableSortLabel";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

import Swal from "sweetalert2";

export default function UserTable() {
    const inputRef = useRef(null)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    setData(
      userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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

  function handleDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  function handleSearch(e) {
    const trimmedValue = e.target.value.trim();
    setSearchValue(trimmedValue);
    const filteredData = userData.filter((item) =>
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

  function handleBlock(){

    Swal.fire({
        title: "Are you sure?",
        text: "You want to block this User",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Block!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "User has been blocked.",
            icon: "success",
          });
        }
      });
  }

  return (
    <>
      <div className="w-full h-20 bg-transparent flex justify-end items-center pe-4">
        <div className="flex bg-white justify-center items-center rounded-md px-2 border border-primary">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            ref={inputRef}
            className="focus:outline-none  text-sm py-1"
            // defaultValue={searchValue}
          />
          {searchValue && <IoMdClose size={20} className="cursor-pointer transition-all duration-700"  onClick={resetSearch} />}
        </div>
      </div>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "5px" }}
        className="rounded-md bg-red-500"
      >
        <Table
          sx={{ minWidth: 650 }}
          className="rounded-md"
          aria-label="simple table"
        >
          <TableHead className="bg-primary">
            <TableRow>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "Si_no" ? order : "desc"}
                  onClick={() => handleSort("Si_no")}
                >
                  Si_no
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
                <TableSortLabel
                  active
                  direction={orderBy === "Name" ? order : "desc"}
                  onClick={() => handleSort("Name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "orders" ? order : "desc"}
                  onClick={() => handleSort("orders")}
                >
                  Orders
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "Total" ? order : "desc"}
                  onClick={() => handleSort("Total")}
                >
                  Total Purchase
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "Status" ? order : "desc"}
                  onClick={() => handleSort("Status")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row,i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={`${i%2===0&&"bg-gray-200/50"}`}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.Si_no}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={row.Image}
                    alt="image"
                    className="w-10 h-10  rounded-full object-cover"
                  />
                </TableCell>
                <TableCell align="center">{row.Name}</TableCell>
                <TableCell align="center">{row.orders}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center items-center">
                    <BsCurrencyDollar size={15} />
                    <p>{row.Total}</p>
                  </div>
                </TableCell>
                <TableCell align="center">
                  {row.Status ? (
                    <button className="bg-green-400/90 px-2 py-1 rounded-full">
                      Active
                    </button>
                  ) : (
                    <button className="bg-red-400/80 px-3 py-1 rounded-full" onClick={()=>handleBlock(row.Si_no)}>
                      Blocked
                    </button>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: "flex",
                    gap: "15px",
                    justifyContent: "center",
                  }}
                >
                  <CiEdit size={25} className="text-primary" />
                  <IoTrashOutline
                    size={23}
                    className="text-red-500"
                    onClick={() => handleDelete(row._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={userData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
