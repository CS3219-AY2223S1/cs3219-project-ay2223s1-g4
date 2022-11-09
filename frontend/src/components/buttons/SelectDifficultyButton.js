import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SelectDifficultyButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant={"outlined"}
      sx={{ m: 2 }}
      margin="20px"
      onClick={() => {
        navigate("/selectdifficulty");
      }}
    >
      Select Difficulty
    </Button>
  );
};

export default SelectDifficultyButton;
