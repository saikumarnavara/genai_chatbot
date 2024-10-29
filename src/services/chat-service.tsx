import { GEMINI_API_ENDPOINT as API } from '../utils/API'

export const ChatService = {
    sendMessage: async (payload:String) => {
        return await API.post('text-search', payload);
    }
};
