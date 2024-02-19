import { useEffect } from "react";
import { Button, Modal, Stack, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { CloseBtn, ModalPaper, StyledTextarea } from "./CommentForm.styled";
import useInput from "../hooks/useInput";
import ErrorMessage from "./ErrorMessage";

interface IProps {
  isOpen: boolean;
  handleModal: () => void;
}

const CommentForm = ({ isOpen, handleModal }: IProps) => {
  const nameInput = useInput("", {
    isEmpty: false,
    minLength: 3,
  });
  const emailInput = useInput("", {
    isEmpty: false,
    minLength: 3,
  });
  const homepageInput = useInput("", {
    isEmpty: true,
    minLength: 0,
  });
  const commentInput = useInput("", {
    isEmpty: false,
    minLength: 5,
  });

  useEffect(() => {
    if (isOpen) {
      nameInput.clear();
      emailInput.clear();
      homepageInput.clear();
      commentInput.clear();
    }
  }, [isOpen]);

  const handleAddComment = () => {
    throw new Error("---need make handleAddComment---");
  };

  return (
    <Modal
      open={isOpen ? true : false}
      onClose={handleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalPaper>
        <CloseBtn onClick={handleModal}>
          <ClearIcon />
        </CloseBtn>

        <Stack spacing={2}>
          <TextField
            required
            error={nameInput.error && nameInput.isDirty ? true : false}
            value={nameInput.value}
            onBlur={() => nameInput.onBlur()}
            onChange={(e) => nameInput.onChange(e.target.value)}
            helperText={nameInput.isDirty && nameInput.error}
            id="user-Name"
            label="User Name"
            variant="outlined"
          />
          <TextField
            required
            error={emailInput.error && emailInput.isDirty ? true : false}
            value={emailInput.value}
            onBlur={() => emailInput.onBlur()}
            onChange={(e) => emailInput.onChange(e.target.value)}
            helperText={emailInput.isDirty && emailInput.error}
            id="e-mai"
            label="E-mai"
            variant="outlined"
          />
          <TextField
            required
            error={homepageInput.error && homepageInput.isDirty ? true : false}
            value={homepageInput.value}
            onBlur={() => homepageInput.onBlur()}
            onChange={(e) => homepageInput.onChange(e.target.value)}
            helperText={homepageInput.error}
            id="home-page"
            label="Home page"
            variant="outlined"
          />
          <StyledTextarea
            value={commentInput.value}
            onBlur={() => commentInput.onBlur()}
            onChange={(e) => commentInput.onChange(e.target.value)}
            aria-label="comment"
            placeholder="Comment *"
            minRows={5}
          />
          {commentInput.error && commentInput.isDirty && (
            <ErrorMessage error={commentInput.error} />
          )}
        </Stack>
        <Button onClick={handleAddComment}>Add comment</Button>
      </ModalPaper>
    </Modal>
  );
};

export default CommentForm;
