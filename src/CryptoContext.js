// src/CryptoContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import axios from "axios";
import { CoinList } from "./config/api";
import { onSnapshot, doc } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  // 🔹 Fetch Coins
  const fetchCoins = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Currency Symbol & Fetch Coins
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");

    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // 🔹 Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return unsubscribe;
  }, []);

  // 🔹 Watchlist Listener
  useEffect(() => {
    if (!user) {
      setWatchlist([]);
      return;
    }

    const coinRef = doc(db, "watchlist", user.uid);
    const unsubscribe = onSnapshot(coinRef, (coin) => {
      if (coin.exists()) {
        setWatchlist(coin.data().coins);
      }
    });

    return unsubscribe;
  }, [user]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        alert,
        setAlert,
        user,
        coins,
        loading,
        watchlist,
        fetchCoins, // ✅ VERY IMPORTANT
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => useContext(Crypto);
