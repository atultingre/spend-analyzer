import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ExpenseContext } from '../../context/ExpenseContext';
import FormContext from "../../context/FormContext";

const EditExpense = () => {
  const {expenses,updateExpense }= useContext(ExpenseContext)
  const {
    category,
    setCategory,
    subCategory,
    setSubCategory,
    availableSubCategories,
    setAvailableSubCategories,
    description,
    setDescription,
    date,
    setDate,
    amount,
    setAmount,
  } = useContext(FormContext);
  const { expenseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const expense = expenses.find((expense) => expense.id === expenseId);
    if (expense) {
      setDescription(expense.description);
      setAmount(expense.amount.toString());
      setDate(expense.date);
      setCategory(expense.category);
    }
    // eslint-disable-next-line
  }, [expenses, expenseId]);

  const handleUpdateExpense = () => {
    if (description && amount && date && category) {
      const existingExpense = expenses.find((expense) => expense.id === expenseId);
      const updatedExpense = {
        ...existingExpense,
        description,
        amount: parseFloat(amount),
        date,
        category,
      };
  
      Swal.fire({
        title: 'Are you sure?',
        text: 'This action will update the expense.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2196f3',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          updateExpense(updatedExpense);
          Swal.fire('Updated!', 'The expense has been updated.', 'success').then(() => {
            navigate('/expenses');
          });
        }
      });
    }
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
  };

  const handleCancel = () => {
    navigate("/expenses");
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubCategory("");
    setAvailableSubCategories(getAvailableSubCategories(selectedCategory));
  };

  // Helper function to determine available sub-categories based on the selected category
  const getAvailableSubCategories = (selectedCategory) => {
    switch (selectedCategory) {
      case "Needs":
        return ["Housing", "Transportation", "Food", "Health", "Personal Care"];
      case "Wants":
        return [
          "Entertainment",
          "Clothing and Accessories",
          "Dining Out",
          "Recreation",
          "Electronics and Gadgets",
        ];
      case "Miscellaneous":
        return [
          "Personal Items",
          "Home",
          "Utilities",
          "Insurance",
          "Taxes",
          "Charitable Contributions",
          "Savings",
        ];
      default:
        return [];
    }
  };

  return (
    <div style={{margin:"auto", maxWidth:700}}>

    <Grid container spacing={2}>
    <Grid item xs={12} textAlign="center">
    <Typography variant="h4" textAlign="center" component="h2" style={{fontFamily: 'Courgette, cursive'}} gutterBottom>Edit Expense</Typography>
    </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Select Category</InputLabel>
          <Select value={category} onChange={handleCategoryChange} fullWidth>
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="Needs">Needs</MenuItem>
            <MenuItem value="Wants">Wants</MenuItem>
            <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Select Sub-Category</InputLabel>
          <Select
            value={subCategory}
            onChange={handleSubCategoryChange}
            fullWidth>
            <MenuItem value="">Select Sub-Category</MenuItem>
            {availableSubCategories.map((subCategoryOption) => (
              <MenuItem key={subCategoryOption} value={subCategoryOption}>
                {subCategoryOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    <Grid item xs={12}>
      <TextField
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Expense"
        placeholder="Expense"
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        label="Amount"
        placeholder="Amount"
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        label="Date"
        // placeholder="Date"
        fullWidth
      />
    </Grid>
    <Grid item xs={12}>
    <FormControl fullWidth sx={{gap:1}}>
      <Button
        variant="contained"
        onClick={handleUpdateExpense}
        disabled={
          !description || !amount || !date || !category || !subCategory
        }
        fullWidth>
        Update Expense
      </Button>
      <Button variant="outlined" color="error" onClick={handleCancel} fullWidth>
        Cancel
      </Button>
    </FormControl>
    </Grid>
  </Grid>
    </div>
  );
};

export default EditExpense;
// 