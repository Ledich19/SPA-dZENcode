import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CommentItem from "./CommentItem";
import { Comment, CommentActions, ModalHandler } from "../types/comments.types";
import { Box, Button, Pagination, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useState } from "react";
import { SortDirection } from "../types/enums";
import { PAGE_SIZE_DEFAULT } from "../constants";

interface IProps {
  comments: Comment[];
  handleModal: ModalHandler;
  actions: CommentActions;
  total: number;
}

const CommentsTable = ({ comments, handleModal, actions, total }: IProps) => {
  const [sortBy, setSortBy] = useState<{
    name: SortDirection | null;
    email: SortDirection | null;
    createdAt: SortDirection | null;
  }>({
    name: null,
    email: null,
    createdAt: SortDirection.DESC,
  });
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    actions.getAll({ page: page, pageSize: PAGE_SIZE_DEFAULT, sort: sortBy });
  }, [sortBy, page]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = (_: any, page: number) => {
    setPage(page);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sortDirection={sortBy.name ? sortBy.name : false}
              >
                <TableSortLabel
                  active={!!sortBy.name}
                  direction={sortBy.name ? sortBy.name : SortDirection.ASC}
                  onClick={() => {
                    //setOrder(order === "desc" ? "asc" : "desc");
                    setSortBy({
                      name:
                        sortBy.name === SortDirection.DESC
                          ? SortDirection.ASC
                          : SortDirection.DESC,
                      email: null,
                      createdAt: null,
                    });
                    //setOrderBy("User mname");
                  }}
                >
                  {"User mname"}
                  {sortBy.email ? (
                    <Box component="span" sx={visuallyHidden}>
                      {sortBy.name === SortDirection.DESC
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>

              <TableCell
                align="left"
                sortDirection={sortBy.email ? sortBy.email : false}
              >
                <TableSortLabel
                  active={!!sortBy.email}
                  direction={sortBy.email ? sortBy.email : SortDirection.ASC}
                  onClick={() => {
                    setSortBy({
                      name: null,
                      email:
                        sortBy.email === SortDirection.DESC
                          ? SortDirection.ASC
                          : SortDirection.DESC,
                      createdAt: null,
                    });
                  }}
                >
                  {"E-mail"}
                  {sortBy.email ? (
                    <Box component="span" sx={visuallyHidden}>
                      {sortBy.email === SortDirection.DESC
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>

              <TableCell
                align="left"
                sortDirection={sortBy.createdAt ? sortBy.createdAt : false}
              >
                <TableSortLabel
                  active={!!sortBy.createdAt}
                  direction={
                    sortBy.createdAt ? sortBy.createdAt : SortDirection.ASC
                  }
                  onClick={() => {
                    setSortBy({
                      name: null,
                      email: null,
                      createdAt:
                        sortBy.createdAt === SortDirection.DESC
                          ? SortDirection.ASC
                          : SortDirection.DESC,
                    });
                  }}
                >
                  {"created data"}
                  {sortBy.createdAt ? (
                    <Box component="span" sx={visuallyHidden}>
                      {sortBy.createdAt === SortDirection.DESC
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <Button onClick={() => handleModal(null)}>Add comment</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell colSpan={4}>
                  <CommentItem
                    comment={comment}
                    handleModal={handleModal}
                    actions={actions}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(total / PAGE_SIZE_DEFAULT)}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={handlePageChange}
      />
    </>
  );
};
export default CommentsTable;
