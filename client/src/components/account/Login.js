import React, { useState, useContext, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import blogImg from "../assest/blog.png";
import styled from "@emotion/styled";
import { API } from "../../service/api.js";
import { DataContext } from "../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled("img")({
  width: 250,
  margin: "auto",
  display: "flex",
  padding: "20px 0 0",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background: rgb(250, 101, 2);
  color: #fff;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: rgb(250, 101, 2);
  height: 40px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;
// const Error = styled(Typography)`
// font-size:10px;
// color:#ff6161;
// line-height:0;
// margin-top: 10px;
// font-weight: 600;

// `;


const Text = styled(Typography)`
  color: #878787;
`;


const signupInitialValues = {
  name : '',
  username: '',
  password: ''
}
const loginInitialValues = {
  username: '',
  password: ''
}


const Login = ({isUserAuthenticated}) => {
  const [account, toggleAccount] = useState("login");
  const [signup , setSignup] = useState(signupInitialValues);
  const [login , setLogin] = useState(loginInitialValues);
  const [error, setError] = useState('');

  const {setAccount} = useContext(DataContext);
  useEffect(() => {
    isUserAuthenticated(true);
  }, [isUserAuthenticated]);
  
  const navigate = useNavigate();
  const toggleSignup = ()=>{
    account === "login" ?
    toggleAccount("signup") 
    : toggleAccount('login');
  }

  const onInputChange = (e)=>{
    
   setSignup({ ...signup , [e.target.name]: e.target.value});
  }
  const onValueChange = (e)=>{

    setLogin({ ...login, [e.target.name]: e.target.value})
  }
  const loginUser = async()=>{
    let response =  await  API.userLogin(login);
   
   if(response.isSuccess){
    setError('');
    sessionStorage.setItem('accessToken', `Bearer ${response.data.accessesToken}`);
    sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
    setAccount({username : response.data.username, name: response.data.name})
    navigate ('/');

   }else{
    setError("Something went wrong plz try again later");
   }
  }
  const signUpUser = async()=>{
    let response =  await API.userSignup(signup);
    
    if(response.isSuccess){
      setError('');
      setSignup(signupInitialValues);
      toggleAccount("login");
    }else{
      setError("Something went wrong plz try again later")
    }
   }
  return (
    <Component>

      <Box>
        <Image className="img" src={blogImg} alt="login" />
        {account === "login" ? (
          <Wrapper>
            <TextField variant="standard" name="username" value={login.username} onChange={(e)=>onValueChange(e)} label="Enter username" />
            <TextField variant="standard"  name="password" value={login.password} onChange={(e)=>onValueChange(e)} label="Enter password" />
            <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
            <Text style={{ textAlign: "center", marginTop: "10px" }}>Or</Text>
            <SignupButton onClick={()=>toggleSignup()}>Create an Account</SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField variant="standard" name="name" onChange={(e)=>onInputChange(e)} label="Enter Name" />
            <TextField variant="standard" name="username" onChange={(e)=>onInputChange(e)} label="Enter username" />
            <TextField variant="standard" name="password" onChange={(e)=>onInputChange(e)} label="Enter password" />

            { error && <Typography>{error}</Typography>}
            <LoginButton onClick={()=>signUpUser()} variant="contained">SignUp</LoginButton>
            <Text style={{ textAlign: "center", marginTop: "10px" }}>Or</Text>
            <SignupButton onClick={()=>toggleSignup()}>Already have an Account</SignupButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
