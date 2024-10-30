import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
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
} from "../../redux/slices/documents-list-slice";
const ListingOfDoc = () => {
  const dispatch = useDispatch();
  const { documents } = useSelector((state: any) => state.doc_list);

  // Handle delete document
  const handleDelete = async (documentId: string) => {
    try {
      dispatch(setLoading(true));

      // Attempt to delete the document
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
      // Ensure loading is turned off after the operation completes
      dispatch(setLoading(false));
    }
  };

  // Handle copy document name
  const handleCopy = (documentId: string) => {
    navigator.clipboard.writeText(documentId);
    alert(`Copied ${documentId} to clipboard!`);
  };

  return (
    <div>
      <h2>Document List</h2>
      <List>
        {documents &&
          documents?.map((documentId: string) => (
            <ListItem key={documentId} divider>
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
          ))}
      </List>
    </div>
  );
};

export default ListingOfDoc;
