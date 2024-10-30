import { GEMINI_API_ENDPOINT as API } from "../utils/API";

export const UploadDocument = {
  uploadFile: async (formData: FormData): Promise<any> => {
    return await API.post("upload-source-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
  },
  ListOutTheDocs: async (): Promise<any> => {
    return await API.get("list-documents");
  },
  deleteDocument: async (id: string): Promise<any> => {
    return await API.delete(`/delete-document/${id}`);
  },
};
