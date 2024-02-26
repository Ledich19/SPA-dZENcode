import "./App.scss";
import { Container, Paper } from "@mui/material";
import CommentsTable from "./components/CommentsTable";
import CommentForm from "./components/CommentForm";
import { useEffect, useState } from "react";
import { useSockets } from "./hooks/useSockets";
import { ModalState } from "./types/comments.types";
import { PAGE_SIZE_DEFAULT } from "./constants";
import { SortDirection } from "./types/enums";

function App() {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    parentId: null,
  });
  const { comments, log, actions } = useSockets();

  useEffect(() => {
    actions.getAll({
      page: 1,
      pageSize: PAGE_SIZE_DEFAULT,
      sort: {
        name: null,
        email: null,
        createdAt: SortDirection.DESC,
      },
    });
  }, []);

  const handleModal = (parentId: string | null) => {
    setModal((value) => ({ isOpen: !value.isOpen, parentId }));
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
