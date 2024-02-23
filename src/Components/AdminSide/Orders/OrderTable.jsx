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
import { SiMicrosoftexcel } from "react-icons/si";
import { FaRegFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import { downloadExcel } from "react-export-table-to-excel";
import autoTable from "jspdf-autotable";

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

  const header = [
    "Si",
    "Order Id",
    "Customer Name",
    "Total",
    "Address",
    "Status",
  ];

  const filteredData = data.map((item) => {
    const clone = { ...item };
    delete clone.Image;
    clone.Status = "" + clone.Status;
    return clone;
  });

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Orders",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        body: filteredData,
        className: "font-medium",
      },
    });
  }

  function generatePdf() {
    const doc = new jsPDF();

    function toArray() {
      const array = [];
      filteredData.map((item) => {
        let values = [];
        for (const value in item) {
          values.push(item[value]);
        }
        array.push(values);
        values = [];
      });
      return array;
    }
    autoTable(doc, {
      head: [header],
      body: toArray(),
      theme: "grid",
    });
    doc.save("Orders.pdf");
  }

  return (
    <>
      <div className="w-full h-28 bg-transparent flex flex-col md:flex-row gap-4 md:justify-end items-end md:items-center md:pe-4">
        <div className="flex gap-3">
          <div
            className="flex items-center gap-3 bg-slate-200 cursor-pointer py-2 px-3 border border-primary rounded-md"
            onClick={handleDownloadExcel}
          >
            <button className="text-sm">Export</button>
            <SiMicrosoftexcel size={18} color="green" />
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer bg-slate-200 py-2 px-3 border border-primary rounded-md"
            onClick={generatePdf}
          >
            <button className="text-sm">Export</button>
            <FaRegFilePdf size={18} color="red" />
          </div>
        </div>
        <div className="flex bg-white justify-center items-center rounded-md px-2 border border-primary">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            ref={inputRef}
            className="focus:outline-none h-9 text-sm py-1"
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
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: "10px",
                }}
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
    </>
  );
}
