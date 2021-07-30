import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { API_PROD } from "../api";
let fetch = require("node-fetch");

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  details: {
    fontSize: "16px",
  },
});

interface IDetails {
  name: string;
  age: number;
  dob: string;
  profession: string;
  locality: string;
  numberOfGuests: string;
  address: string;
}

const FirstPage = () => {
  const classes = useStyles();
  const [data, setData] = useState<IDetails[]>();
  const [searched, setSearched] = useState<string>("");

  const fetchData = () => {
    fetch(`${API_PROD}/show`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res: { json: () => any }) => res.json())
      .then((json: any) => setData(json));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const requestSearch = (searchedVal: string) => {
    const filteredRows = data?.filter((row) => {
      return (
        row.locality.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.name.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <div className="condiv home">
      <Paper variant="outlined" style={{ width: 1200, marginRight: "60px" }}>
        <SearchBar
          cancelOnEscape={true}
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.heading}>
                  Name
                </TableCell>
                <TableCell align="center" className={classes.heading}>
                  Age
                </TableCell>
                <TableCell align="center" className={classes.heading}>
                  Date of Birth
                </TableCell>
                <TableCell align="center" className={classes.heading}>
                  Profession
                </TableCell>
                <TableCell align="center" className={classes.heading}>
                  Locality
                </TableCell>
                <TableCell align="center" className={classes.heading}>
                  No.of Guests
                </TableCell>
                <TableCell align="right" className={classes.heading}>
                  Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row: any) => (
                <TableRow key={row._id}>
                  <TableCell align="center" className={classes.details}>
                    {row.name}
                  </TableCell>
                  <TableCell align="center" className={classes.details}>
                    {row.age}
                  </TableCell>
                  <TableCell align="center" className={classes.details}>
                    {row.dob}
                  </TableCell>
                  <TableCell align="center" className={classes.details}>
                    {row.profession}
                  </TableCell>
                  <TableCell align="center" className={classes.details}>
                    {row.locality}
                  </TableCell>
                  <TableCell align="center" className={classes.details}>
                    {row.numberOfGuests}
                  </TableCell>
                  <TableCell align="right" className={classes.details}>
                    {row.address}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default FirstPage;
