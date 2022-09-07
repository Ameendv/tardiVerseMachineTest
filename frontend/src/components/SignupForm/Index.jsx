import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import axios from 'axios'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {SERVER_URL} from '../../constants/serverUrl'


import Grid from '@material-ui/core/Grid';
import { signupSchema } from '../../validations/signupValidtion'


import TextField from '@mui/material/TextField';
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import KeyIcon from "@mui/icons-material/Key";




function Index() {

 
    const [values, setValues] = useState({
      password: "",
      username: "",
      email:"",
      number:"",
  
      showPassword: false,
    });

    const navigate=useNavigate()

    const handleChange=(prop)=>(event)=>{
      setValues({ ...values, [prop]: event.target.value });
      
    }

    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const onSubmit=async()=>{


await signupSchema.validate(values, { abortEarly: false }).then((data)=>{
  doSignup(data)
}).catch((error)=>{

  toast.error(` ${error.inner[0].message}`)
})

    }

    const doSignup = async(data)=>{
        await axios.post(`${SERVER_URL}/api/user-signup`,values).then((data)=>{
          if(data.status===200){
            toast.success("Registered succesfully")
          }
        }).catch((error)=>{
          if(error.response.data.status===409){
            toast.error('User already registered. ')
          }
        })
    }
  
  return (
    <React.Fragment>
    <Box  sx={{display:'flex',alignContent:'center'}} >
     
      <Grid container spacing={3} >
        <Grid item xs={12}>
        <div style={{ marginTop: "10px" }}>
            <TextField
              sx={{}}
              id="input-with-icon-textfield"
              placeholder="Full Name"
              onChange={handleChange("username")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextField
              sx={{}}
              id="input-with-icon-email"
              placeholder="Email"
              onChange={handleChange("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
           
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextField
            placeholder='Mobile Number'
              sx={{}}
              id="input-with-icon-phone"
             
              onChange={handleChange("number")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroidIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
           
          </div>
          <div style={{ marginTop: "20px" }}>
           
            <Input
            placeholder='Password'
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
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button variant="contained" sx={{ backgroundColor: "#D61C4E" }} onClick={onSubmit}> 
              Signup
            </Button>
          </div>

          <div style={{ marginTop: "20px",display:"flex",justifyContent:'center' }}>
            <p>Already registered?  </p><Button  color="primary" onClick={()=>{navigate('/login')}}> 
              Login
            </Button><p>Here </p>
          </div>
        </Grid>
      </Grid>
    </Box>
    </React.Fragment>
  );
}

export default Index
