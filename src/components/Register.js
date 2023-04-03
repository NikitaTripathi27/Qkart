import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory ,Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const[personName , setpersonName] = useState("");
  const[pasword , setpasword] =useState("");
  const[cpasword ,setcpasword] = useState("");
  const[firstcircular , setfirstcircular] = useState(0);

  const history = useHistory();

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *  
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    if(validateInput(validateData) === true){
     setfirstcircular(1);
    
    try{
      const info  = await axios.post(`${config.endpoint}/auth/register`, formData
      )
      console.log(info)
      if(info.status === 201){
      setfirstcircular(0);
        // if(circular==false)
        enqueueSnackbar('Registration successful', {
          variant:`success`,
        })
        history.push("/login",{from:"Register"})
      }
      // console.log(info.data)
      // console.log("sucess:true")
    }
    catch(error){
     if(error.response.status ===400){
      console.log(error.response.data.message)
      // key = enqueueSnackbar(" trying to register an already registered user")
      enqueueSnackbar(error.response.data.message, {
        variant: 'error',
      })
     }
     else{
      console.log("Something went wrong. Check that the backend is running, reachable and returns valid JSON")
      enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON', {
        variant: 'error',
      })
     }
     setfirstcircular(0);
    }
  }
  };
 // curl -X POST -F 'name=linuxize' -F 'email=linuxize@example.com' https://example.com/contact.php
  //<workspace-ip>:8081/api/v1/auth/register

  let validateData = {
    username:personName,
    password:pasword,
    confirmPassword:cpasword
  }
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    let check=true;
    if(data.username==="" ){
      enqueueSnackbar("UserName is required",{variant:"error"});
      check=false;
    }
    if(data.username.length < 6)
    {
      enqueueSnackbar("Username must be at least 6 characters" ,{variant:"error"})
      check=false;
    }
    if(data.password ===""){
      enqueueSnackbar("Password is a required field",{variant:"error"})
      check=false;
    }
    if(data.password.length < 6){
      enqueueSnackbar("Password is less than 6 characters",{variant:"error"})
      check=false;
    }
    if(data.confirmPassword !== data.password){
      enqueueSnackbar("Passwords do not match",{variant:"error"})
      check=false;
    }
    return check;
  };
  let obj = {
    username:personName,
    password:pasword
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={(e)=>setpersonName(e.target.value)}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={(e)=>setpasword(e.target.value)}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={(e)=>setcpasword(e.target.value)}
          />
           {/* <SnackbarProvider /> */}
           {firstcircular === 0 && <Button className="button" variant="contained" onClick={()=>register(obj)}>
            Register Now
           </Button>}
           {firstcircular === 1 && <CircularProgress className="progress"/>}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
