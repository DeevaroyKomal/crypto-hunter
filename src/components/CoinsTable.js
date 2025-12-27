// src/components/CoinsTable.js
import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import {
  Container,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol, coins, loading } = CryptoState();
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleSearch = () =>
    coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ my: 2 }}>
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For a Crypto Currency..."
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress sx={{ bgcolor: "orchid" }} />
          ) : (
            <Table>
              <TableHead sx={{ bgcolor: "orchid" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                      sx={{ fontWeight: "bold", color: "black" }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, page * 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        key={row.id}
                        hover
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/coins/${row.id}`)}
                      >
                        <TableCell sx={{ display: "flex", gap: 2 }}>
                          <img src={row.image} alt={row.name} height="50" />
                          <div>
                            <Typography>{row.symbol.toUpperCase()}</Typography>
                            <Typography color="gray">{row.name}</Typography>
                          </div>
                        </TableCell>

                        <TableCell align="right">
                          {symbol} {numberWithCommas(row.current_price)}
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{ color: profit ? "green" : "red" }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={Math.ceil(handleSearch().length / 10)}
          sx={{ 
            p: 2, 
            display: "flex", 
            justifyContent: "center"
           }}
          onChange={(_, value) => {
            setPage(value);
            window.scrollTo(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
