import { Box } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        border: "1px solid orchid",
        borderRadius: 1,
        px: 3,
        py: 1,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "orchid" : "transparent",
        color: selected ? "black" : "white",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "orchid",
          color: "black",
        },
        width: "22%",
        textAlign: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default SelectButton;
