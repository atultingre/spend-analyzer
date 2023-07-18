import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { BudgetContext } from "../../context/BudgetContext";
import { ExpenseContext } from "../../context/ExpenseContext";

const Expenses = () => {
  const { budgets}= useContext(BudgetContext)
  const { expenses,updateExpense,deleteExpense }= useContext(ExpenseContext)

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditExpense = (expense) => {
    const budget = budgets.find((budget) => budget.id === expense.budgetId);
    updateExpense({ ...expense, budgetName: budget ? budget.name : "" });
    navigate(`/edit-expense/${expense.id}`);
  };

  const num = page * rowsPerPage;

  return (
    <div>
      {budgets && budgets.length > 0 ? (
        <>

      <h3>Expenses</h3>
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr No</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Sub-Category</TableCell>
                <TableCell>Expenses</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((expense, index) => {
                const budget = budgets.find((budget) => budget.id === expense.budgetId);
                return (
                  <TableRow key={expense.id}>
                    <TableCell>{num + index + 1}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{budget ? budget.name : "Unknown"}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.subCategory}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>₹{expense.amount}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton color="primary" onClick={() => handleEditExpense(expense)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => deleteExpense(expense.id)}
                          sx={{ marginRight: "10px" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={expenses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        </>
      
      ) : (
        null
     )}
    </div>
  );
};

export default Expenses;
