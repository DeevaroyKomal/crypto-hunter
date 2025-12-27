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

const Header = () => {
  const { currency, setCurrency, user } = CryptoState();

  return (
    <AppBar position="static" color="transparent">
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* LEFT SECTION */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
          >
            Crypto Hunter
          </Typography>

          {/* RIGHT SECTION */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            
            {/* Currency Selector */}
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              sx={{
                height: 40,
                color: "white",
                borderColor: "white",
              }}
            >
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>

            {/* Login / User */}
            {user ? <UserSidebar /> : <AuthModal />}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
