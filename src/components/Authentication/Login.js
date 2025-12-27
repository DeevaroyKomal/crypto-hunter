// src/components/Authentication/Login.js
import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({ open: true, message: "Please fill all the Fields", type: "error" });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({ open: true, message: `Sign In Successful. Welcome ${result.user.email}`, type: "success" });
      handleClose();
    } catch (error) {
      setAlert({ open: true, message: error.message, type: "error" });
    }
  };

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="Enter Email" type="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Enter Password" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" size="large" sx={{ bgcolor: "orchid" }} onClick={handleSubmit}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
