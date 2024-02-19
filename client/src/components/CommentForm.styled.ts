import { IconButton, Paper, TextareaAutosize } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ModalPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  paddingTop: theme.spacing(8),
  position: "relative",
  maxWidth: "700px",
  margin: "0 auto",
  //height: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const CloseBtn = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
}));

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

export const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: auto;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 5px 5px 5px 5px;
    color: ${theme.palette.mode === "dark" ? "#f5f5f5" : grey[900]};
    background: ${theme.palette.background.paper};
    border: 1px solid ${
      theme.palette.mode === "dark" ? "#ffffff38" : grey[200]
    };
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
    resize: none;
    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 2px ${
        theme.palette.mode === "dark" ? "#f5f5f5" : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
