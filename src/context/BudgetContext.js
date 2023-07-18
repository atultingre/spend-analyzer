import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ExpenseContext } from "./ExpenseContext";
// import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const { expenses, setExpenses } = useContext(ExpenseContext);
  
  // Load budgets and expenses data from local storage on initial render
  useEffect(() => {
    const storedBudgets = localStorage.getItem("budgets");
    const storedExpenses = localStorage.getItem("expenses");

    if (storedBudgets) {
      setBudgets(JSON.parse(storedBudgets));
    }

    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, [setExpenses]);

  // Update local storage whenever budgets or expenses change
  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [budgets, expenses]);

  // Function to add a new budget
  const addBudget = (newBudget) => {
    const budgetWithId = { ...newBudget, id: uuidv4() };
    setBudgets([...budgets, budgetWithId]);
  };

  // // Function to update an existing budget
  const updateBudget = (updatedBudget) => {
    const updatedBudgets = budgets.map((budget) => {
      if (budget.id.toString() === updatedBudget.id.toString()) {
        // const budgetExpenses = expenses.filter(
        //   (expense) => expense.budgetId === budget.id
        // );
        return {
          ...updatedBudget,
        };
      }
      return budget;
    });

    setBudgets(updatedBudgets);
  };

  // Function to delete a budget and its associated expenses
  const deleteBudget = (budgetId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the budget and its associated expenses.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setBudgets((prevBudgets) =>
          prevBudgets.filter((budget) => budget.id !== budgetId)
        );
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.budgetId !== budgetId)
        );
        Swal.fire(
          "Deleted!",
          "The budget and its associated expenses have been deleted.",
          "success"
        );
      }
    });
  };

  return (
    <BudgetContext.Provider
      value={{ budgets, setBudgets, addBudget, updateBudget, deleteBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};
