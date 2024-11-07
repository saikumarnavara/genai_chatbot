import { GEMINI_API_ENDPOINT as API } from "../utils/API";

export const ChatService = {
  geminiSearch: async (payload: any): Promise<any> => {
    return await API.post(payload.endpoint, payload.payload, {
      headers: {
        "Content-Type": payload.payloadType,
        accept: "application/json",
      },
    });
  },
};
