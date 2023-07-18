import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
import { ExpenseContext } from "../../context/ExpenseContext";
import FormContext from "../../context/FormContext";

const AddExpense = () => {
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
  const {addExpense} = useContext(ExpenseContext)

  const navigate = useNavigate();
  const location = useLocation();
  const budgetId = location.pathname.split("/").pop(); // Extract the budgetId from the current URL

  const handleAddExpense = () => {
    if (description && amount && date && category && subCategory) {
      const newExpense = {
        id: Math.random().toString(),
        description,
        amount: parseFloat(amount),
        date,
        category,
        subCategory,
        budgetId,
      };

      Swal.fire({
        title: "Are you sure?",
        text: "This action will add the expense.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2196f3",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Add",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          addExpense(newExpense);
          setDescription("");
          setAmount("");
          setDate("");
          setCategory("");
          setSubCategory("");
          Swal.fire("Added!", "The expense has been added.", "success").then(
            () => {
              navigate("/expenses");
            }
          );
        }
      });
    }
  };


  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
  };

  const handleCancel = () => {
    navigate("/");
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
      <Grid container spacing={1} sx={{ maxWidth: 700, margin: "1rem auto" }}>
        <Grid item xs={12} textAlign="center">
          <Typography
            variant="h4"
            textAlign="center"
            component="h2"
            style={{ fontFamily: "Courgette, cursive" }}
            gutterBottom>
            Add Expense
          </Typography>
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
          <FormControl fullWidth sx={{ gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleAddExpense}
              disabled={
                !description || !amount || !date || !category || !subCategory
              }
              fullWidth>
              Add Expense
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancel}
              fullWidth>
              Cancel
            </Button>
          </FormControl>
        </Grid>
      </Grid>
  );
};

export default AddExpense;
