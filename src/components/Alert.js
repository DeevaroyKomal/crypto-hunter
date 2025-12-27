import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { CryptoState } from "../CryptoContext";

const Alert = () => {
  const { alert, setAlert } = CryptoState();

  // ✅ SAFETY CHECK
  if (!alert) return null;

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;

    setAlert({
      open: false,
      message: "",
      type: "success",
    });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <MuiAlert
        onClose={handleClose}
        severity={alert.type || "success"} // ✅ fallback
        variant="filled"
        elevation={6}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
