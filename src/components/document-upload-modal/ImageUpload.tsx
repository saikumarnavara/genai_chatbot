import React, { useState } from "react";
import { Modal, Box, Button, Typography, IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
// import { useDispatch } from "react-redux";
// import { setMultimodalImage } from "../../redux/slices/search-type-slice";

// Define styles for the modal
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ImageUpload = ({ handleImg }: any) => {
  // const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null); // Reset the selected file on close
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // const fileUrl = URL.createObjectURL(selectedFile);
      // dispatch(setMultimodalImage({ url: fileUrl, name: selectedFile.name }));
      handleImg(selectedFile);
      handleClose();
    }
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <ImageIcon
          sx={{
            color: "#000",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-upload-modal"
        aria-describedby="select-an-image-to-upload"
      >
        <Box sx={modalStyle}>
          <Typography id="image-upload-modal" variant="h6" component="h2">
            Upload Image
          </Typography>
          <input type="file" accept="image/*" onChange={handleFileSelection} />
          <Button onClick={handleUpload} sx={{ mt: 2 }} variant="contained">
            Upload
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ mt: 2, ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ImageUpload;
