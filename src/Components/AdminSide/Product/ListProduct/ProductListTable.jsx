import { useEffect, useRef, useState } from "react";
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
import { IoMdClose } from "react-icons/io";
import { fetchProductData } from "../../../../Services/Api/ProductApi";

export default function ProductListTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalProduct,setTotalProduct] = useState(0)
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);
  const open = Boolean(anchorEl);

  useEffect(() => {

    const fetchData = async () => {
      const { data, total } = await fetchProductData(page, rowsPerPage);
      setData(data);
      setTotalProduct(total );
    };

    fetchData();
  }, [page, rowsPerPage]);

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
    const trimmedValue = event.target.value.trim();
    setSearch(trimmedValue);
    const filteredData = productData.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(trimmedValue.toLowerCase())
      )
    );
    setData(filteredData);
  };

  function resetSearch() {
    setSearch("");
    inputRef.current.value = "";
    handleSearch({ target: { value: "" } });
  }

  return (
    <>
      <div className="w-full h-20  flex justify-end items-center pe-4">
        <div className="flex justify-between items-center h-10 text-sm drop-shadow-xl px-4 rounded-md bg-white outline-none border-2 border-primary">
          <input
            type="text"
            ref={inputRef}
            placeholder="Search..."
            className="h-full w-full outline-none rounded-md"
            onChange={handleSearch}
          />
          <IoMdClose
            size={18}
            className={`cursor-pointer ${search ? "block" : "hidden"}`}
            onClick={resetSearch}
          />
        </div>
      </div>
      <TableContainer
        component={Paper}
        className="max-h-[500px] overscroll-y-auto rounded-lg border border-primary"
      >
        <Table aria-label="Product table">
          <TableHead className="h-20 sticky top-0 bg-primary px-4 z-10">
            <TableRow>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "si_no" ? order : "asc"}
                  onClick={() => handleSort("si_no")}
                >
                  SI
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "Image" ? order : "asc"}
                  onClick={() => handleSort("Image")}
                >
                  Image
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "manufacturer" ? order : "asc"}
                  onClick={() => handleSort("manufacturer")}
                >
                  Manufacturer
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active
                  direction={orderBy === "productId" ? order : "asc"}
                  onClick={() => handleSort("productId")}
                >
                  Product Id
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "price" ? order : "asc"}
                  onClick={() => handleSort("price")}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "category" ? order : "asc"}
                  onClick={() => handleSort("category")}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "stock" ? order : "asc"}
                  onClick={() => handleSort("stock")}
                >
                  Stock
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "released" ? order : "asc"}
                  onClick={() => handleSort("released")}
                >
                  Released
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleSort("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "status" ? order : "asc"}
                  onClick={() => handleSort("status")}
                  hideSortIcon={false} // Set hideSortIcon to false to always show the sort arrow
                >
                  Status
                </TableSortLabel>
              </TableCell>

              <TableCell align="center" className="font-bold">
                <TableSortLabel >Actions</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className={`${i % 2 === 0 && "bg-slate-100"}`}
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
                        <MenuItem
                          onClick={handleClose}
                          style={{ fontSize: "small" }}
                        >
                          Preview
                        </MenuItem>
                        <MenuItem
                          onClick={handleClose}
                          style={{ fontSize: "small" }}
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
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
         rowsPerPageOptions={[5, 10, 25, 50]}
         component="div"
         count={totalProduct}
         rowsPerPage={rowsPerPage}
         page={page}
         onPageChange={handleChangePage}
         onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
