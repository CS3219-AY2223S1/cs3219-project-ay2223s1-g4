import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/loading";
import Carousel from "react-bootstrap/Carousel";
import slideOne from "../assets/slide-1.svg"
import slideTwo from "../assets/slide-2.svg";
import slideThree from "../assets/slide-3.svg";
import slideFour from "../assets/slide-4.svg";

function DashBoard() {
  const { isAuthenticated, isLoading } = useAuth0();
    
  if (isLoading) {
    return <Loading/>;
  }

  return (
    isAuthenticated && (
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
        <Carousel.Item>
          <img className="d-block w-100" src={slideFour} alt="Fourth slide" />
        </Carousel.Item>
      </Carousel>
    )
  );
}

export default DashBoard;
