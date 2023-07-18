import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { BudgetProvider } from './context/BudgetContext';
import { FormProvider } from './context/FormContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ExpenseProvider>
        <BudgetProvider>
          <FormProvider>
            <App />
          </FormProvider>
        </BudgetProvider>
      </ExpenseProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
