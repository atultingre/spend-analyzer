import React, { createContext, useState } from "react";

export const FormContext = createContext();
export const FormProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [availableSubCategories, setAvailableSubCategories] = useState([]);

  // Define your form state update functions here
  const updateName = (value) => {
    setName(value);
  };

  const updateAmount = (value) => {
    setAmount(value);
  };

  const formState = {
    name,
    setName,
    amount,
    setAmount,
    updateName,
    updateAmount,
    description,
    setDescription,
    date,
    setDate,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    availableSubCategories,
    setAvailableSubCategories,
  };

  return (
    <FormContext.Provider value={formState}>{children}</FormContext.Provider>
  );
};

export default FormContext;
