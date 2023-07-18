import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Typography, TextField, Button, Box, FormControl, Stack } from "@mui/material";
import { BudgetContext } from "../../context/BudgetContext";

const AddBudget = () => {
  const {addBudget} = useContext(BudgetContext)
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleAddBudget = () => {
    if (name && amount) {
      const newBudget = {
        id: Math.random().toString(),
        name,
        amount: parseFloat(amount),
      };
      addBudget(newBudget);
      setName("");
      setAmount("");
      navigate("/");

      Swal.fire({
        icon: "success",
        title: "Budget added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "2rem auto" }}>
      <Stack gap={2}>
        <Typography variant="h4" textAlign="center" component="h2" style={{fontFamily: 'Courgette, cursive'}} gutterBottom>
          Add Budget
        </Typography>
        <FormControl fullWidth sx={{ gap: 1 }}>
          <TextField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            placeholder="Budget Name"
          />
          <TextField
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            placeholder="Budget Amount"
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddBudget}
          fullWidth>
          Add Budget
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleCancel}
          fullWidth>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default AddBudget;
