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
import { IoMdClose } from "react-icons/io";
import { fetchProductData } from "../../../../Services/Api/ProductApi";
// Excel module
import { downloadExcel } from "react-export-table-to-excel";
import { SiMicrosoftexcel } from "react-icons/si";
// Pdf generator module
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaRegFilePdf } from "react-icons/fa";
import ProductPreview from "./ProductPreview";

export default function ProductListTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalProduct, setTotalProduct] = useState(0);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState(null);

  const inputRef = useRef(null);
  const [open, setOpen] = useState({ id: null, state: false });

  useEffect(() => {
    const fetchData = async () => {
      const { data, total } = await fetchProductData(page, rowsPerPage);
      setData(data);
      setTotalProduct(total);
    };

    fetchData();
  }, [page, rowsPerPage]);

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

  // Export to excel
  const header = [
    "Si",
    "Name",
    "Manufacturer",
    "Product Id",
    "Category",
    "Price",
    "Stock",
    "Released",
    "Date",
    "Status",
  ];

  const filteredData = data.map((item) => {
    const clone = { ...item };
    delete clone.Image;
    clone.status = "" + clone.status;
    return clone;
  });
  function handleDownloadExcel() {
    downloadExcel({
      fileName: "react-export-table-to-excel -> downloadExcel method",
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
    doc.save("product-table.pdf");
  }

  if(showDetails){
    document.body.classList.add('active-overflow-hidden');
    return(
      <ProductPreview
      data={showDetails}
      setShowDetails={setShowDetails}
      />
      )
    }else{
    document.body.classList.remove('active-overflow-hidden');

  }

  return (
    <>
      <div className="w-full h-36 md:h-20  flex flex-col items-end justify-center  md:flex-row md:justify-end md:items-center pe-4 gap-4">
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
        <Table aria-label="Product table" id="Product_table">
          <TableHead className="h-20 sticky top-0 bg-primary px-4 z-[2]">
            <TableRow>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "Si_no" ? order : "desc"}
                  onClick={() => handleSort("Si_no")}
                >
                  SI
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
                  direction={orderBy === "Image" ? order : "desc"}
                  onClick={() => handleSort("Image")}
                >
                  Image
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "Manufacturer" ? order : "desc"}
                  onClick={() => handleSort("Manufacturer")}
                >
                  Manufacturer
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active
                  direction={orderBy === "ProductId" ? order : "desc"}
                  onClick={() => handleSort("ProductId")}
                >
                  Product Id
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "Price" ? order : "desc"}
                  onClick={() => handleSort("Price")}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "Category" ? order : "desc"}
                  onClick={() => handleSort("Category")}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "Stock" ? order : "desc"}
                  onClick={() => handleSort("Stock")}
                >
                  Stock
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "Released" ? order : "desc"}
                  onClick={() => handleSort("Released")}
                >
                  Released
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active
                  direction={orderBy === "Date" ? order : "desc"}
                  onClick={() => handleSort("Date")}
                >
                  Date
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

              <TableCell align="center" className="font-bold">
                <TableSortLabel hideSortIcon>Actions</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={`${i % 2 === 0 && "bg-slate-100"}`}
              >
                <TableCell>{row.Si_no}</TableCell>

                <TableCell>{row.Name}</TableCell>
                <TableCell>
                  <img
                    src={row.Image}
                    className="h-10 rounded-full w-10"
                    alt="product image"
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell>{row.Manufacturer}</TableCell>
                <TableCell>{row.ProductId}</TableCell>
                <TableCell>{row.Price}</TableCell>
                <TableCell>{row.Category}</TableCell>
                <TableCell>{row.Stock}</TableCell>
                <TableCell>{row.Released}</TableCell>
                <TableCell>{row.Date}</TableCell>
                <TableCell>{`${row.Status ? "True" : "False"}`}</TableCell>
                <TableCell className="px-0 ">
                  <div className="flex relative  flex-row items-center justify-center gap-2">
                    <Tooltip title="Edit" arrow>
                      <IconButton>
                        <MdOutlineEdit size={20} />
                      </IconButton>
                    </Tooltip>
                    <div
                      className={`${
                        open.id === row.Si_no && open.state ? "block" : "hidden"
                      } absolute w-28 z-[1] h-20 top-9 right-4 bg-white border border-gray-300 flex flex-col items-center justify-center  rounded-md
                      `}
                    >
                      <div className="flex w-full justify-center hover:bg-slate-200 cursor-pointer" onClick={()=>{setShowDetails(row), setOpen({
                            ...open,
                            id: null,
                            state: false,
                          })}}>
                        <h4 className="py-1 px-3">Preview</h4>
                      </div>
                      <div className="flex w-full justify-center hover:bg-slate-200 cursor-pointer ">
                        <h4 className="py-1 px-3">Delete</h4>
                      </div>
                    </div>
                    <Tooltip title="Options" arrow>
                      <IconButton
                        onClick={() =>
                          setOpen({
                            ...open,
                            id: row.Si_no,
                            state: !open.state,
                          })
                        }
                      >
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
