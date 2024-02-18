import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Forum } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import { Comment } from "../types/comment";

interface IProps {
  comment: Comment;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CommentItem = ({ comment }: IProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: "auto" }}>
      <CardHeader
        sx={{ bgcolor: "gray" }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {comment.user.name[0]}
          </Avatar>
        }
        title={comment.user.name}
        subheader={comment.createdAt.toISOString()}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment.text}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Tooltip title="reply to comment">
          <IconButton aria-label="reply to comment">
            <Forum />
          </IconButton>
        </Tooltip>
    

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
          <ExpandMoreIcon />
        </ExpandMore>
         
      </CardActions>

      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{ paddingLeft: "1%" }}
      >

<Box sx={{ paddingLeft: 4 }}>
                  {comment.comments?.map((child) => (
                     <CommentItem
                        key={child.id}
                        comment={child}
                     />
                  ))}
               </Box>
      </Collapse>
    </Card>
  );
};
export default CommentItem;
