import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilePresent, Forum } from "@mui/icons-material";
import { Box, Button, Stack, Tooltip } from "@mui/material";
import { Comment } from "../types/comment";
import { commentItemStyles, ExpandMoreButton } from "./CommentItem.styled";
import { useState } from "react";

interface IProps {
  comment: Comment;
  handleModal: () => void;
}

const CommentItem = ({ comment, handleModal }: IProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={commentItemStyles.card}>
      <CardHeader
        disableTypography
        sx={commentItemStyles.cardHeader}
        avatar={
          <Avatar sx={commentItemStyles.avatar} aria-label="recipe">
            {comment.user.name[0]}
          </Avatar>
        }
        title={comment.user.name}
        subheader={comment.createdAt.toISOString()}
      />
      <CardContent sx={commentItemStyles.cardContent}>
        <Box
          component="div"
          sx={commentItemStyles.imageContainer}
          key={"https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"}
        >
          <img
            src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
            style={commentItemStyles.image}
            alt={"item.title"}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {comment.text}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
         <Tooltip title="file name">
          <Button aria-label="filename">
            <FilePresent /> Filename.txt
          </Button>
        </Tooltip>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ marginLeft: "auto" }}
        >
          <Tooltip title="reply to comment">
            <IconButton onClick={handleModal} aria-label="reply to comment">
              <Forum />
            </IconButton>
          </Tooltip>
          <Box component="span">{comment.comments.length}</Box>
          <ExpandMoreButton
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMoreButton>
        </Stack>
      </CardActions>

      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={commentItemStyles.collapse}
      >
        <Box sx={{ paddingLeft: 4 }}>
          {comment.comments?.map((child) => (
            <CommentItem key={child.id} comment={child} handleModal={handleModal} />
          ))}
        </Box>
      </Collapse>
    </Card>
  );
};

export default CommentItem;
