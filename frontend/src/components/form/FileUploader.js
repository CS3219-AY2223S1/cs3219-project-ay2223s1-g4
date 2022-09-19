import React, {useState, onFileSelectSuccess, onFileSelectError} from 'react';
import { Input } from '@mui/material';
function FileUploader(){
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
    if (event.size > 8000000)
{    onFileSelectError({ error: "File size cannot exceed more than 8MB" });
}  else {onFileSelectSuccess(event);
}
	};


	return(
   <div>
			<Input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
		</div>
	)
}

export default FileUploader