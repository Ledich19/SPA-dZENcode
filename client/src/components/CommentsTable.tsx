import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CommentItem from "./CommentItem";
import { Comment, CommentActions, ModalHandler } from "../types/comments.types";
import { Box, Button, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useState } from "react";

interface IProps {
  comments: Comment[];
  handleModal: ModalHandler;
  actions: CommentActions;
}

const CommentsTable = ({ comments, handleModal, actions }: IProps) => {
  type Order = "asc" | "desc";
  type SortBy = "User mname" | "E-mail" | "created data";
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("User mname");

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sortDirection={orderBy === "User mname" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "User mname"}
                  direction={orderBy === "User mname" ? order : "asc"}
                  onClick={() => {
                    setOrder(order === "desc" ? "asc" : "desc");
                    setOrderBy("User mname");
                  }}
                >
                  {"User mname"}
                  {orderBy === "User mname" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="left"
                sortDirection={orderBy === "E-mail" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "E-mail"}
                  direction={orderBy === "E-mail" ? order : "asc"}
                  onClick={() => {
                    setOrder(order === "desc" ? "asc" : "desc");
                    setOrderBy("E-mail");
                  }}
                >
                  {"E-mail"}
                  {orderBy === "E-mail" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>

              <TableCell
                align="left"
                sortDirection={orderBy === "created data" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "created data"}
                  direction={orderBy === "created data" ? order : "asc"}
                  onClick={() => {
                    setOrder(order === "desc" ? "asc" : "desc");
                    setOrderBy("created data");
                  }}
                >
                  {"created data"}
                  {orderBy === "created data" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
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
    </>
  );
};
export default CommentsTable;
