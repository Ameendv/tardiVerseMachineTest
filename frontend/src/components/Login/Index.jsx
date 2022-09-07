import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {loginSchema} from '../../validations/signupValidtion'
import axios from 'axios'
import { SERVER_URL } from "../../constants/serverUrl";


import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import KeyIcon from "@mui/icons-material/Key";

function Index() {
  const [values, setValues] = useState({
    password: "",
    email: "",

    showPassword: false,
  });

  const { email, password } = values;

  const navigate = useNavigate();
 

const data={
    email, password
}



  const onSubmit = async (e) => {
    await loginSchema
      .validate(data, { abortEarly: false })
      .then((response) => {
        doLogin(response);
      })
      .catch((error) => {
        toast.error(` ${error.inner[0].message}`);
      });
  };

  const doLogin=async(data)=>{
    await axios.post(`${SERVER_URL}/api/user-login`,data).then((response)=>{
        console.log(response)
    }).catch((error)=>{
        console.log(error)
    })
  }


 
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Box
        sx={{
          bgcolor: "#00092C",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          padding: "100px",
        }}
      >
        <Grid
          item
          rowSpacing={2}
          sx={{
            width: 400,
            height: 300,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#fff",
            padding: "40px",
            border: "1px solid",
            borderColor: "white",
          }}
        >
          <Grid sx={{ marginTop: "10px" }}>
            <TextField
              sx={{}}
              id="input-with-icon-textfield"
              label="email"
              onChange={handleChange("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Grid>
          <Grid sx={{ marginTop: "20px" }}>
            <InputLabel
              htmlFor="standard-adornment-password"
              sx={{ fontSize: "12px" }}
            >
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              sx={{ width: "210px" }}
              startAdornment={
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid sx={{ marginTop: "20px" }}>
            <Button variant="contained" sx={{ backgroundColor: "#D61C4E" }} onClick={onSubmit}> 
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default Index;