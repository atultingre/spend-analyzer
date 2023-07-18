import React, { useContext } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const {handleSignup} = useContext(AuthContext)

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    // Perform signup validation and create a new user
    // ...

    // Simulating successful signup for demonstration purposes
    const userData = {
      username: values.username,
      email: values.email,
      // Add other user data if needed
    };
    handleSignup(userData);
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "2rem auto" }}>
       <Typography variant="h4" textAlign="center" component="h2" style={{fontFamily: 'Courgette, cursive'}} gutterBottom>
        Signup
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ gap: 1 }}>
              <TextField
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                error={errors.username && touched.username}
              />
              <FormHelperText error={errors.username && touched.username}>
                <ErrorMessage name="username" />
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ gap: 1 }}>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined" 
                error={errors.email && touched.email}
              />
              <FormHelperText error={errors.email && touched.email}>
                <ErrorMessage name="email" />
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ gap: 1 }}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined" 
                error={errors.password && touched.password}
              />
              <FormHelperText error={errors.password && touched.password}>
                <ErrorMessage name="password" />
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ gap: 1 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth>
                Signup
              </Button>
              <Button
                type="submit"
                variant="outlined"
                color="secondary"
                component={Link}
                to="/login"
                fullWidth>
                Login
              </Button>
            </FormControl>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Signup;
