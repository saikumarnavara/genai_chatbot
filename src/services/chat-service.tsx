import { GEMINI_API_ENDPOINT as API } from "../utils/API";

export const ChatService = {
  geminiSearch: async (payload: any): Promise<any> => {
    console.log(payload, "in service");
    return await API.post(payload.endpoint, payload.payload, {
      headers: {
        "Content-Type": payload.payloadType,
        accept: "application/json",
      },
    });
  },
};
