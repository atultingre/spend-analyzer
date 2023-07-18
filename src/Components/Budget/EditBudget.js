import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  Stack,
} from "@mui/material";
import { BudgetContext } from "../../context/BudgetContext";

const EditBudget = () => {
  const {budgets, updateBudget } = useContext(BudgetContext);
  const { budgetId } = useParams();
  const budget = budgets.find((budget) => budget.id === budgetId);

  const [name, setName] = useState(budget?.name ?? "");
  const [amount] = useState(budget?.amount ?? 0);
  const navigate = useNavigate();

  const handleUpdateBudget = () => {
    if (name && amount) {
      const updatedBudget = {
        ...budget,
        name,
        amount: parseFloat(amount),
      };

      Swal.fire({
        title: "Are you sure?",
        text: "This action will update the budget.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2196f3",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          updateBudget(updatedBudget);
          Swal.fire("Updated!", "The budget has been updated.", "success").then(
            () => {
              navigate("/");
            }
          );
        }
      });
    }
  };
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "2rem auto" }}>
      <Stack gap={2}>
        <Typography
          variant="h4"
          textAlign="center"
          component="h2"
          style={{ fontFamily: "Courgette, cursive" }}
          gutterBottom>
          Edit Budget
        </Typography>
        <FormControl fullWidth sx={{ gap: 1 }}>
          <TextField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            placeholder="Name"
          />
          {/* <TextField
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            placeholder="Amount"
          /> */}
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateBudget}>
          Update Budget
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
          fullWidth>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default EditBudget;
