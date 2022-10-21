import { Box } from "@mui/material";
import LoginButton from "../components/buttons/LoginButton";
import RegisterButton from "../components/buttons/RegisterButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import Carousel from "react-bootstrap/Carousel";
import slideOne from "../assets/slide-1.svg";
import slideTwo from "../assets/slide-2.svg";
import slideThree from "../assets/slide-3.svg";

function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth0();
    
  if (isLoading) {
    return <Loading/>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={slideOne} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slideTwo} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slideThree} alt="Third slide" />
        </Carousel.Item>
      </Carousel>

      <LoginButton fullWidth="true" margin="20px"></LoginButton>
      <RegisterButton fullWidth="true" margin="20px"></RegisterButton>
    </Box>
  );
}

export default LoginPage;
