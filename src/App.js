import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Budgets from "./Components/Budget/Budgets";
import Budget from "./Components/Budget/Budget";
import Expenses from "./Components/Expense/Expenses";
import AddBudget from "./Components/Budget/AddBudget";
import EditBudget from "./Components/Budget/EditBudget";
import AddExpense from "./Components/Expense/AddExpense";
import EditExpense from "./Components/Expense/EditExpense";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import NavigationBar from "./Components/Nav/NavigationBar";

const App = () => {
  
  return (
    <>
      <Router>
        <NavigationBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Budgets />} />
            <Route path="/budgets/:budgetId" element={<Budget />} />
            <Route exact path="/add-budget" element={<AddBudget />} />
            <Route
              exact
              path="/edit-budget/:budgetId"
              element={<EditBudget />}
            />
            <Route
              exact
              path="/add-expense/:budgetId"
              element={<AddExpense />}
            />
            <Route
              exact
              path="/edit-expense/:expenseId"
              element={<EditExpense />}
            />
            <Route exact path="/expenses" element={<Expenses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
