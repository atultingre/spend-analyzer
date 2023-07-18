import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { BudgetContext } from "../../context/BudgetContext";
import { ExpenseContext } from "../../context/ExpenseContext";

const Budgets = () => {
  const {budgets,updateBudget, deleteBudget} = useContext(BudgetContext)
  const {expenses} = useContext(ExpenseContext)

  const navigate = useNavigate();

  const handleEditBudget = (budget) => {
    updateBudget(budget);
    navigate(`/edit-budget/${budget.id}`);
  };

  const calculateRemainingAmount = (budget) => {
    const budgetExpenses = expenses.filter(
      (expense) => expense.budgetId === budget.id
    );
    const totalExpenses = budgetExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    return budget.amount - totalExpenses;
  };

  const getRemainingAmountColor = (remainingAmount, budgetAmount) => {
    const percentage = (remainingAmount / budgetAmount) * 100;
    if (percentage < 20) {
      return "text-red-500";
    } else if (percentage >= 20 && percentage <= 80) {
      return "text-yellow-500";
    } else {
      return "text-green-500";
    }
  };

  return (
    <div className="mb-20">
      <h4 className="text-2xl font-bold mb-4">Budgets</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {budgets.map((budget) => {
          const remainingAmount = calculateRemainingAmount(budget);
          const remainingAmountColor = getRemainingAmountColor(
            remainingAmount,
            budget.amount
          );

          return (
            <div key={budget.id}>
              <div className="bg-white shadow-md rounded-md p-4">
                <h3 className="text-xl font-bold mb-2">
                  <Link to={`/budgets/${budget.id}`}>{budget.name}</Link>
                </h3>
                <p className="text-base mb-2">Budget Amount: ₹{budget.amount}</p>
                <p className={`text-base ${remainingAmountColor} mb-2`}>
                  Remaining Amount: ₹{remainingAmount}
                </p>
                <div className="flex justify-end">
                  <button
                    className="text-sm text-red-500 mr-2"
                    onClick={() => navigate(`/budgets/${budget.id}`)}
                  >
                    Add Expense
                  </button>
                  <button
                    className="text-sm text-blue-500"
                    onClick={() => handleEditBudget(budget)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="text-sm text-red-500 ml-2"
                    onClick={() => deleteBudget(budget.id)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budgets;
