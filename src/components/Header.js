import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import AuthModal from "./Authentication/AuthModal";
import { CryptoState } from "../CryptoContext";
import UserSidebar from "./Authentication/UserSidebar";
import logo from "../assets/logo.png"; 

const Header = () => {
  const { currency, setCurrency, user } = CryptoState();

  return (
    <AppBar position="static" color="transparent">
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

          {/* LEFT SECTION */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
            }}
          >
            <img
              src={logo}
              alt="Crypto Hunter Logo"
              style={{
                height: "35px",   // 🔑 keeps header stable
                width: "auto",
              }}
            />

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold" }}
            >
              Crypto Hunter
            </Typography>
          </Box>

          {/* RIGHT SECTION */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              sx={{
                height: 40,
                color: "white",
              }}
            >
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>

            {user ? <UserSidebar /> : <AuthModal />}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
