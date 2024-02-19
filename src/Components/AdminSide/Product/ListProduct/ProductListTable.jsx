import { useState } from "react";
import { productData } from "../../../../Services/Constants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import { MdOutlineEdit } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Nodata from "../../../../assets/No data-pana.png"

export default function ProductListTable() {
  const [data, setData] = useState(productData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column) => {
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
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const filteredData = productData.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    setData(filteredData);
  };

  return (
    <>
      <div className="w-full h-20  flex justify-end items-center pe-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          className="h-10 px-5 text-sm drop-shadow-xl rounded-md outline-none border-2 border-primary"
          onChange={handleSearch}
        />
      </div>
      <TableContainer
        component={Paper}
        className="max-h-[500px] overscroll-y-auto  px-4 rounded-lg border border-primary"
      >
        <Table aria-label="Product table">
          <TableHead className="h-20">
            <TableRow>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "si_no"}
                  direction={orderBy === "si_no" ? order : "asc"}
                  onClick={() => handleSort("si_no")}
                >
                  SI
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "Image"}
                  direction={orderBy === "Image" ? order : "asc"}
                  onClick={() => handleSort("Image")}
                >
                  Image
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "manufacturer"}
                  direction={orderBy === "manufacturer" ? order : "asc"}
                  onClick={() => handleSort("manufacturer")}
                >
                  Manufacturer
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "productId"}
                  direction={orderBy === "productId" ? order : "asc"}
                  onClick={() => handleSort("productId")}
                >
                  Product Id
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "price"}
                  direction={orderBy === "price" ? order : "asc"}
                  onClick={() => handleSort("price")}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "category"}
                  direction={orderBy === "category" ? order : "asc"}
                  onClick={() => handleSort("category")}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "stock"}
                  direction={orderBy === "stock" ? order : "asc"}
                  onClick={() => handleSort("stock")}
                >
                  Stock
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "released"}
                  direction={orderBy === "released" ? order : "asc"}
                  onClick={() => handleSort("released")}
                >
                  Released
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleSort("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "status"}
                  direction={orderBy === "status" ? order : "asc"}
                  onClick={() => handleSort("status")}
                >
                  Status
                </TableSortLabel>
              </TableCell>

              <TableCell align="center" className="font-bold">
                <TableSortLabel>Actions</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ?( data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="border-primary"
                >
                  <TableCell>{row.si_no}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <img
                      src={row.Image}
                      className="h-10 rounded-full w-10"
                      alt="product image"
                    />
                  </TableCell>
                  <TableCell>{row.manufacturer}</TableCell>
                  <TableCell>{row.productId}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>{row.released}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{`${row.status ? "True" : "False"}`}</TableCell>
                  <TableCell className="px-0">
                    <div className="flex flex-row items-center justify-center gap-2">
                      <Tooltip title="Edit" arrow>
                        <IconButton>
                          <MdOutlineEdit size={20} />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{ elevation: 1 }}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleClose} className="text-xs">
                          Preview
                        </MenuItem>
                        <MenuItem
                          onClick={handleClose}
                          style={{ fontSize: "10x" }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                      <Tooltip title="Options" arrow>
                        <IconButton onClick={handleClick}>
                          <SlOptionsVertical
                            size={15}
                            className="cursor-pointer"
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))):(
                <div className="w-full h-20 bg-red-400">
                    <img src={Nodata} alt="" />
                </div>
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
