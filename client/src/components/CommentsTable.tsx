//import Box from "@mui/material/Box";
//import Collapse from "@mui/material/Collapse";
//import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
//import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import CommentItem from "./CommentItem";
import { Comment } from "../types/comment";
import { Box, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useState } from "react";
// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
//   price: number
// ) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       {
//         date: "2020-01-05",
//         customerId: "11091700",
//         amount: 3,
//       },
//       {
//         date: "2020-01-02",
//         customerId: "Anonymous",
//         amount: 1,
//       },
//     ],
//   };
// }

// function Row(props: { row: ReturnType<typeof createData> }) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);

//   return (
//     <React.Fragment>
//       <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" scope="row">
//           {row.name}
//         </TableCell>
//         <TableCell align="right">{row.calories}</TableCell>
//         <TableCell align="right">{row.fat}</TableCell>
//         <TableCell align="right">{row.carbs}</TableCell>
//         <TableCell align="right">{row.protein}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography variant="h6" gutterBottom component="div">
//                 History
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Customer</TableCell>
//                     <TableCell align="right">Amount</TableCell>
//                     <TableCell align="right">Total price ($)</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.history.map((historyRow) => (
//                     <TableRow key={historyRow.date}>
//                       <TableCell component="th" scope="row">
//                         {historyRow.date}
//                       </TableCell>
//                       <TableCell>{historyRow.customerId}</TableCell>
//                       <TableCell align="right">{historyRow.amount}</TableCell>
//                       <TableCell align="right">
//                         {Math.round(historyRow.amount * row.price * 100) / 100}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
//   createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
//   createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
//   createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
// ];

interface IProps {
  comments: Comment[];
}

const CommentsTable = ({ comments }: IProps) => {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
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

            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell colSpan={3}>
                  <CommentItem comment={comment} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
    rowsPerPageOptions={[25,50, 100]}
    component="div"
    count={rows.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  /> */}
    </>
  );
};
export default CommentsTable;
