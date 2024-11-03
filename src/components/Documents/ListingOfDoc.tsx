import { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  FileCopy as CopyIcon,
} from "@mui/icons-material";
import { UploadDocument } from "../../services/upload-document-service";
import { useSelector, useDispatch } from "react-redux";
import {
  setDocuments,
  setLoading,
  setError,
  setSelectedDoc,
} from "../../redux/slices/documents-list-slice";
const ListingOfDoc = () => {
  const dispatch = useDispatch();
  const { documents } = useSelector((state: any) => state.doc_list);

  // Handle delete document
  const handleDelete = async (documentId: string) => {
    try {
      dispatch(setLoading(true));
      const response = await UploadDocument.deleteDocument(documentId);
      if (response) {
        const res = await UploadDocument.ListOutTheDocs();
        if (res.status === 200) {
          dispatch(setDocuments(res.data));
        }
        alert("Document deleted successfully.");
      } else {
        dispatch(setError("Failed to delete document."));
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      dispatch(setError("Error deleting document."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle copy document name
  const handleCopy = (documentId: string) => {
    navigator.clipboard.writeText(documentId);
    alert(`Copied ${documentId} to clipboard!`);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await UploadDocument.ListOutTheDocs();
        if (response.status === 200) {
          dispatch(setDocuments(response.data));
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h6">Uploaded Documents</Typography>
      <List>
        {documents && documents.length > 0 ? (
          documents.map((documentId: string) => (
            <ListItem
              key={documentId}
              divider
              onClick={() => {
                dispatch(setSelectedDoc(documentId));
              }}
            >
              <ListItemText primary={documentId} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleCopy(documentId)}>
                  <CopyIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  color="secondary"
                  onClick={() => handleDelete(documentId)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            No uploaded documents
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default ListingOfDoc;
