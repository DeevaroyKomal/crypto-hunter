// src/components/Authentication/UserSidebar.js
import React, { useState } from "react";
import { Avatar, Drawer, Button, Box, Typography } from "@mui/material";
import { CryptoState } from "../../CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../CoinsTable";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

export default function UserSidebar() {
  const [state, setState] = useState({ right: false });
  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
    setState({ ...state, [anchor]: open });
  };

const logOut = () => {
  signOut(auth);

  setAlert({
    open: true,
    type: "success",
    message: "Logout Successful!",
  });

  setState({ right: false }); // ✅ close drawer safely
};


  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef, { coins: watchlist.filter((id) => id !== coin.id) }, { merge: true });
      setAlert({ open: true, message: `${coin.name} Removed from Watchlist!`, type: "success" });
    } catch (error) {
      setAlert({ open: true, message: error.message, type: "error" });
    }
  };

  return (
    <div>
      <Avatar
        onClick={toggleDrawer("right", true)}
        sx={{ height: 38, width: 38, ml: 2, cursor: "pointer", bgcolor: "orchid" }}
        src={user.photoURL}
        alt={user.displayName || user.email}
      />
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer("right", false)}>
        <Box sx={{ width: 350, p: 3, display: "flex", flexDirection: "column", fontFamily: "monospace" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flex: 1 }}>
            <Avatar src={user.photoURL} alt={user.displayName || user.email} sx={{ width: 200, height: 200, bgcolor: "orchid" }} />
            <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", wordWrap: "break-word" }}>
              {user.displayName || user.email}
            </Typography>
            <Box sx={{ flex: 1, width: "100%", bgcolor: "grey", borderRadius: 1, p: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 1, overflowY: "auto" }}>
              <Typography variant="subtitle2" sx={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                Watchlist
              </Typography>
              {coins.filter((coin) => watchlist.includes(coin.id)).map((coin) => (
                <Box key={coin.id} sx={{ p: 1, borderRadius: 1, bgcolor: "orchid", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", boxShadow: "0 0 3px black" }}>
                  <span>{coin.name}</span>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                    <AiFillDelete style={{ cursor: "pointer" }} onClick={() => removeFromWatchlist(coin)} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Button variant="contained" sx={{ mt: 2, bgcolor: "orchid" }} onClick={logOut}>
            Log Out
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}
