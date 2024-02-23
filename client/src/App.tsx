import "./App.scss";
import { Container, Paper } from "@mui/material";
import CommentsTable from "./components/CommentsTable";
import CommentForm from "./components/CommentForm";
import { useEffect, useState } from "react";
import { useSockets } from "./hooks/useSockets";
import { ModalState } from "./types/comments.types";
import { PAGE_SIZE_DEFAULT } from "./constants";

function App() {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    rootId: null,
    parentId: null,
  });
  const { comments, log, actions } = useSockets();

  useEffect(() => {
    actions.getAll({ page: 1, pageSize: PAGE_SIZE_DEFAULT });
  }, []);

  const handleModal = (
    rootId: string | null = null,
    parentId: string | null = null
  ) => {
    setModal((value) => ({ isOpen: !value.isOpen, rootId, parentId }));
  };

  return (
    <Container>
      <Paper>
        <CommentForm
          actions={actions}
          modal={modal}
          handleModal={handleModal}
        />
        <CommentsTable
          actions={actions}
          comments={comments || []}
          handleModal={handleModal}
        />
      </Paper>
    </Container>
  );
}

export default App;
