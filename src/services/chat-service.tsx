import { GEMINI_API_ENDPOINT as API } from "../utils/API";

interface MessagePayload {
  prompt: string;
}

interface DocSearchpayload {
  file_id: string;
  question: string;
}

export const ChatService = {
  sendMessage: async (payload: MessagePayload): Promise<any> => {
    return await API.post("text-search", payload);
  },
  documentChat: async (payload: DocSearchpayload): Promise<any> => {
    return await API.post("document-search", payload);
  },
};
