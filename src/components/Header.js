import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack  } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory ,Link} from "react-router-dom";


// const Header = ({ children,hasHiddenAuthButtons }) => {
//   const history=useHistory();
//     return (
//       <Box className="header">
//         <Box className="header-title">
//             <img src="logo_light.svg" alt="QKart-icon"></img>
//         </Box>
  const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();

  const pathExplore = () => {
    history.push("/");
  };

  const pathRegister = () => {
    history.push("/register");
  };

  const pathLogin = () => {
    history.push("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("balance");
  
    window.location.reload();
};
  if(hasHiddenAuthButtons){
    return (
      <Box className="header">
        <Box className="header-title">
          <Link to="/">
            <img src="logo_light.svg" alt="QKart-icon"></img>
          </Link>
        </Box>
        {children}
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick = {pathExplore}
        >
          Back to explore
        </Button>
      </Box>
    );
}
    return(
      <Box className="header">
        <Box className="header-title">
          <Link to="/">
            <img src="logo_light.svg" alt="QKart-icon"></img>
          </Link>
        </Box>
        {children}
        <Stack direction = "row" spacing = {1} alignItems = "center">
          {localStorage.getItem("username") ?(
            <>
              <Avatar 
                  src = "avatar.png" alt = {localStorage.getItem("username") || "Profile"} />
              <p className="username-text"> {localStorage.getItem("username")}</p>
              <Button type = "primary" onClick={logout}>Logout</Button>
            </>
          ): (
            <>
              <Button onClick={pathLogin}>Login</Button>
              <Button variant = "contained" onClick = {pathRegister}>Register</Button>
            </>
          )}

        </Stack>
     
      </Box>
    );
};

export default Header;
