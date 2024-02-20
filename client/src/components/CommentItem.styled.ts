import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

interface ExpandMoreProps {
  expand: boolean;
}

export const ExpandMoreButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "expand",
})<ExpandMoreProps>(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const commentItemStyles = {
  card: {
    maxWidth: "auto",
    gap: "8px",
  },
  cardHeader: {
    bgcolor: "lightGray",
    padding: 1,
  },
  avatar: {
    bgcolor: red[500],
    marginRight: 1,
  },
  cardContent: {
    padding: 1,
    display: "flex",
  },
  imageContainer: {
    width: 50,
    height: 40,
    marginRight: 1,
    borderRadius: "5px",
    overflow: "hidden",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  } as const,

  collapse: {
    paddingLeft: "1",
  },
};

