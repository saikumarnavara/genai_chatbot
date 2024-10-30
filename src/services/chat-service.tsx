

import { GEMINI_API_ENDPOINT as API } from '../utils/API';

interface MessagePayload {
  prompt: string;
}

export const ChatService = {
  sendMessage: async (payload: MessagePayload): Promise<any> => {
    return await API.post('text-search', payload);
  }
};
