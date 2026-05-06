import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {

  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Hemşire Elif",
      role: "Hemşire",
      time: "16:45",
      lastMessage: "204 nolu hasta stabil.",
      conversation: [
        {
          sender: "them",
          text: "Merhaba doktor bey, 204 nolu hasta stabil durumda.",
        },
      ],
    },

    {
      id: 2,
      name: "Dr. Selin Demir",
      role: "Kardiyoloji",
      time: "15:20",
      lastMessage: "Konsültasyon raporu hazır.",
      conversation: [
        {
          sender: "them",
          text: "Konsültasyon raporu hazır.",
        },
        {
          sender: "me",
          text: "Teşekkürler hocam.",
        },
      ],
    },

    {
      id: 3,
      name: "Ecz. Murat",
      role: "Eczacı",
      time: "14:10",
      lastMessage: "İlaç stok güncellemesi yapıldı.",
      conversation: [
        {
          sender: "them",
          text: "İlaç stok güncellemesi yapıldı.",
        },
      ],
    },
  ]);

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);