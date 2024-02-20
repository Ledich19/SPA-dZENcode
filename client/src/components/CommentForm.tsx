import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, Button, Modal, Stack, TextField, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { CloseBtn, ModalPaper, StyledTextarea } from "./CommentForm.styled";
import useInput from "../hooks/useInput";
import ErrorMessage from "./ErrorMessage";
import { AddPhotoAlternate, AttachFile, Cancel } from "@mui/icons-material";
import { IMG_MAX_HEIGHT, IMG_MAX_WIDTH } from "../constants";

interface IProps {
  isOpen: boolean;
  handleModal: () => void;
}

const CommentForm = ({ isOpen, handleModal }: IProps) => {
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [selectedTxt, setSelectedTxt] = useState<string | ArrayBuffer | null>(
    null
  );
  const inputTxtRef = useRef<HTMLInputElement>(null);
  const nameInput = useInput("", {
    isEmpty: false,
    minLength: 3,
  });
  const regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const regUrl =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  const emailInput = useInput("", {
    isEmpty: false,
    minLength: 3,
    reGex: {
      value: regEmail,
      text: "Mast be email",
    },
  });
  const homepageInput = useInput("", {
    isEmpty: true,
    minLength: 0,
    reGex: {
      value: regUrl,
      text: "mast be link",
    },
  });
  const commentInput = useInput("", {
    isEmpty: false,
    minLength: 5,
  });
  // useEffect(() => {
  //   if (!selectedImg) return
  //   const imgElement = document.createElement("img");
  //   imgElement.src = URL.createObjectURL(selectedImg);
  //   document.body.appendChild(imgElement);
  // },[selectedImg])
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

  const handleSelectImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log("CREATE IMG:");
    reader.onload = (event) => {
      const base64Image = event.target?.result;

      if (!base64Image) return;
      const img = new Image();
      console.log("CREATE IMG: 2");
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > IMG_MAX_WIDTH || height > IMG_MAX_HEIGHT) {
          const scaleFactor = Math.min(
            IMG_MAX_WIDTH / width,
            IMG_MAX_HEIGHT / height
          );
          width *= scaleFactor;
          height *= scaleFactor;
        }
        console.log("CREATE IMG 3");
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        console.log("CREATE IMG: 4");
        canvas.toBlob((blob) => {
          if (!blob) return;
          const fileName = file.name;
          const fileType = file.type;
          const resizedFile = new File([blob], fileName, { type: fileType });
          setSelectedImg(resizedFile);
        }, file.type);
        console.log("CREATE IMG: 5");
      };

      img.src = base64Image as string;
    };
    console.log("CREATE IMG: 6");
    reader.readAsDataURL(file);
  };

  const handleCancelImg = () => {
    setSelectedImg(null);
    if (inputImgRef.current) {
      inputImgRef.current.value = "";
    }
  };

  const handleSelectTxt = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData = event.target?.result;
      if (fileData) {
        setSelectedTxt(fileData);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleCancelTxt = () => {
    setSelectedImg(null);
    if (inputTxtRef.current) {
      inputTxtRef.current.value = "";
    }
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
            type="email"
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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Tooltip title="Додати картинку">
            <label style={{ height: "100%", margin: 0 }} htmlFor="imageInput">
              <input
                ref={inputImgRef}
                type="file"
                id="imageInput"
                accept="image/jpeg, image/gif, image/png"
                style={{ display: "none" }}
                onChange={handleSelectImg}
              />

              {!selectedImg && (
                <Button
                  component="span"
                  style={{ height: "100%", margin: 0 }}
                  aria-label="load img"
                >
                  <AddPhotoAlternate />
                </Button>
              )}
            </label>
          </Tooltip>
          {selectedImg && (
            <Button
              component="span"
              style={{ height: "100%", margin: 0 }}
              onClick={handleCancelImg}
              aria-label="cancel"
            >
              <Cancel />
            </Button>
          )}

          <Tooltip title="add txt file">
            <label style={{ height: "100%", margin: 0 }} htmlFor="textInput">
              <input
                ref={inputTxtRef}
                type="file"
                id="textInput"
                accept=".txt"
                style={{ display: "none" }}
                onChange={handleSelectTxt}
              />

              {!selectedTxt && (
                <Button
                  component="span"
                  style={{ height: "100%", margin: 0 }}
                  aria-label="load file"
                >
                  <AttachFile />
                </Button>
              )}
            </label>
          </Tooltip>
          {selectedTxt && (
            <Button
              component="span"
              style={{ height: "100%", margin: 0 }}
              aria-label="cancel"
              onClick={handleCancelTxt}
            >
              <Cancel />
            </Button>
          )}
        </Box>
        <Button onClick={handleAddComment}>Add comment</Button>
      </ModalPaper>
    </Modal>
  );
};

export default CommentForm;
