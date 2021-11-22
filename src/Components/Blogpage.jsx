import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ReactPaginate from "react-paginate";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import "./Blogpage.css";
const columnsName = [
  { id: "Id", minWidth: 20 },
  { id: "Title", minWidth: 200 },
  { id: "Get Details" },
];

export default function Blogpage(props) {
  let history = useHistory();

  const [getData, setData] = useState([]);
  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((result) => setData(result));
  };

  useEffect(() => {
    fetchData();
  }, []);
  function ButtonAppBar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              List of your Blog post
            </Typography>
            <Button
              color="inherit"
              onClick={() => history.push({ pathname: "/Addblog" })}
            >
              Add Blog{" "}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(getData.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const handleClick = (row) => {
    // console.log("data", row);
    history.push({ pathname: "/Blogdetails", data: row });
  };

  return (
    <>
      {ButtonAppBar()}
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columnsName.map((column) => (
                  <TableCell
                    key={column.id}
                    //   align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "black",
                      color: "white",
                      fontSize: 20,
                    }}
                  >
                    {column.id}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {getData
                .slice(pagesVisited, pagesVisited + usersPerPage)

                .map((row) => (
                  <>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleClick(row)}
                        >
                          Click here
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              {/* );
              })} */}
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ float: "right" }} className="">
          <ReactPaginate
            nextLabel={<HiChevronDoubleRight />}
            onPageChange={changePage}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel={<HiChevronDoubleLeft />}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </Paper>
    </>
  );
}
