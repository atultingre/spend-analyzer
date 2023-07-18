import React, { createContext, useState } from "react";
import Swal from "sweetalert2";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  // Function to add a new expense
  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  // Function to update an existing expense
  const updateExpense = (updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  // Function to delete an expense
  const deleteExpense = (expenseId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the expense.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== expenseId)
        );
        Swal.fire("Deleted!", "The expense has been deleted.", "success");
      }
    });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
      }}>
      {children}
    </ExpenseContext.Provider>
  );
};
