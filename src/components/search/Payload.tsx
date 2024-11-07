type SearchType = "textsearch" | "multimodel" | "documentsearch";

interface PayloadResponse {
  payload: FormData | Record<string, any>;
  endpoint: string;
  payloadType: string;
  serviceName: string;
}

export const ReturnPayload = (
  searchType: SearchType,
  search_query: string,
  file?: any,
  fileName?: string
): PayloadResponse | undefined => {
  switch (searchType) {
    case "textsearch":
      const textPayload = {
        prompt: search_query,
      };
      return {
        payload: textPayload,
        endpoint: "text-search",
        payloadType: "application/json",
        serviceName: "textSearch",
      };

    case "multimodel":
      const fileData = new FormData();
      fileData.append("image", file);
      return {
        payload: fileData,
        endpoint: `multimodal-search/?prompt=${search_query}`,
        payloadType: "multipart/form-data",
        serviceName: "documentChat",
      };
      break;

    case "documentsearch":
      const documentPayload = {
        file_id: fileName,
        question: search_query,
      };
      return {
        payload: documentPayload,
        endpoint: "document-search",
        payloadType: "application/json",
        serviceName: "documentChat",
      };

    default:
      return undefined;
  }
};
