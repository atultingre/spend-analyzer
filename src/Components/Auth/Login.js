import React, { useContext } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    // Perform login validation and authentication
    // ...

    // Simulating successful login for demonstration purposes
    const userData = {
      email: values.email,
      // Add other user data if needed
    };
    handleLogin(userData);
  };

  return (
    <div style={{ margin: "auto", maxWidth: 500 }}>
      <Stack spacing={2}>
        <Typography
          variant="h4"
          textAlign="center"
          component="h2"
          style={{ fontFamily: "Courgette, cursive" }}
          gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ gap: 1 }}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  // size="small"
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
                  // size="small"
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
                  Login
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to="/signup"
                  fullWidth>
                  Signup
                </Button>
              </FormControl>
            </form>
          )}
        </Formik>
      </Stack>
    </div>
  );
};

export default Login;
