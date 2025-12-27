import { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import Login from "./Login";
import Signup from "./Signup";

const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const { setAlert } = CryptoState();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      setAlert({
        open: true,
        message: `Welcome ${result.user.email}`,
        type: "success",
      });

      setOpen(false);
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ bgcolor: "orchid" }}
        onClick={() => setOpen(true)}
      >
        Login
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 400,
            bgcolor: "#1a1a1a",
            color: "white",
            p: 3,
            mx: "auto",
            mt: "10%",
            borderRadius: 2,
          }}
        >
          <Tabs
            value={tab}
            onChange={(e, v) => setTab(v)}
            centered
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

          {tab === 0 && <Login handleClose={() => setOpen(false)} />}
          {tab === 1 && <Signup handleClose={() => setOpen(false)} />}

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <GoogleButton
              style={{ width: "100%" }}
              onClick={handleGoogleLogin}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AuthModal;
