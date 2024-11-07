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
import { Delete as DeleteIcon } from "@mui/icons-material";
import { UploadDocument } from "../../services/upload-document-service";
import { useSelector, useDispatch } from "react-redux";
import {
  setDocuments,
  setLoading,
  setError,
  setSelectedDoc,
  clearSelectedDoc,
} from "../../redux/slices/documents-list-slice";
import Loader from "../loader/Loader";

const ListingOfDoc = () => {
  const dispatch = useDispatch();
  const { documents, isLoading } = useSelector((state: any) => state.doc_list);

  // Handle delete document
  const handleDelete = async (documentId: string) => {
    try {
      dispatch(setLoading(true));
      const response = await UploadDocument.deleteDocument(documentId);
      if (response) {
        dispatch(clearSelectedDoc(documentId));
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

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        dispatch(setLoading(true));
        const response = await UploadDocument.ListOutTheDocs();
        if (response.status === 200) {
          dispatch(setDocuments(response.data));
        }
      } catch (error) {
        dispatch(setLoading(false));
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [dispatch]);

  useEffect(() => {
    if (documents && documents.length > 0) {
      dispatch(setSelectedDoc(documents[0]));
    }
  }, [documents]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Uploaded Documents
      </Typography>
      <List sx={{ width: "100%" }}>
        {documents && documents.length > 0 ? (
          documents.map((documentId: string) => (
            <ListItem
              key={documentId}
              divider
              onClick={() => {
                dispatch(setSelectedDoc(documentId));
              }}
              sx={{
                cursor: "pointer",
                backgroundColor: "background.paper",
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: 1,
                transition: "transform 0.2s, box-shadow 0.2s",
                mb: 1,
                "&:hover": {
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                  transform: "scale(1.02)",
                },
                padding: 2,
              }}
            >
              <ListItemText
                primary={documentId}
                primaryTypographyProps={{
                  variant: "body1",
                  fontWeight: "500",
                  color: "text.primary",
                }}
              />
              <ListItemSecondaryAction>
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
      {isLoading && <Loader />}
    </Box>
  );
};

export default ListingOfDoc;
