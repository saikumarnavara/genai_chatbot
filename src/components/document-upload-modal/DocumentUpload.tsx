import React, { useState } from "react";
import { UploadDocument } from "../../services/upload-document-service";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  setDocuments,
  setLoading,
  // setError,
} from "../../redux/slices/documents-list-slice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { IconButton } from "@mui/material";

const DocumentUpload = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { isLoading } = useSelector((state: any) => state.doc_list);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        dispatch(setLoading(true));
        const formData = new FormData();
        formData.append("sourceFile", selectedFile, selectedFile.name);

        const response = await UploadDocument.uploadFile(formData);
        if (response.status === 200) {
          setShowModal(false);
          setSelectedFile(null);
          alert("File uploaded successfully!");
          // Fetch and update the list of documents
          const documentsResponse = await UploadDocument.ListOutTheDocs();
          if (documentsResponse.status === 200) {
            dispatch(setDocuments(documentsResponse.data));
          } else {
            alert("Failed to retrieve documents.");
          }
        } else {
          alert("File upload failed. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("File upload failed. Please try again.");
      }
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div>
      <IconButton onClick={() => setShowModal(true)}>
        <UploadFileIcon
          sx={{
            color: "#000",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        />
      </IconButton>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <input
            type="file"
            onChange={handleFileChange}
            accept="application/pdf"
          />
          {isLoading && <Loader />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary" variant="contained">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DocumentUpload;
