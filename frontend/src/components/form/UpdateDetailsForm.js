import React, {useState} from "react";
import axios from "axios";
import FileUploader from "./FileUploader";
import { TextField, Button } from "@mui/material";
import {useAuth0} from '@auth0/auth0-react';
const UpdateDetailsForm =  () => {
    const [name, setName] = useState("");
    const [email,  setEmail] = useState("");
    const [password,  setPassword] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const { user , isLoading } = useAuth0();
    
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    const submitForm = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        formData.append("file", selectedFile);
        // TODO: Add upload url or Auth0 call here
        // user.sub
        axios
          .post('UPLOAD_URL', formData)
          .then((res) => {
            alert("File Upload success");
          })
          .catch((err) => alert("File Upload Error"));
      };

    return (
    <form>
        <FileUploader
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        />
        <TextField id="outlined-basic" label="Name" variant="outlined" 
        helperText='Add your Name here'  
        required onChange={(e) => setName(e.target.value)}/>
        <TextField id="outlined-basic" label="Password" variant="outlined" 
        helperText='Add your Password here'  
        required onChange={(e) => setPassword(e.target.value)} type="password"> 
        </TextField>
        <TextField id="outlined-basic" label="Email" variant="outlined" 
        helperText='Add your Email here'  
        required onChange={(e) => setEmail(e.target.value)}> </TextField>
        

        <Button variant="outlined" onClick={submitForm}>Submit</Button>
      </form>
      )
}

export default UpdateDetailsForm