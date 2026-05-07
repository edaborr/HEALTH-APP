import React from "react";
import {
  Search,
  Send,
  MessageCircle,
} from "lucide-react";
import { useMessages } from "../../context/MessageContext";




const MessagesPage = () => {
    const { messages, setMessages } = useMessages();
  const [activeChat, setActiveChat] = React.useState(null);

  return (
    <div className="h-screen bg-[#F4FBFC] flex p-6 gap-6">

      {/* LEFT PANEL */}
      <div
        className="
          w-[420px]
          bg-white
          rounded-[36px]
          border
          border-[#DCEFF3]
          shadow-sm
          flex
          flex-col
          overflow-hidden
        "
      >

        {/* HEADER */}
        <div className="p-6 border-b border-[#EDF5F7]">

          <h1 className="text-4xl font-black text-slate-800">
            Mesajlar
          </h1>

          <p className="text-slate-400 mt-2">
            Son konuşmalar ve sistem mesajları.
          </p>
        </div>

        {/* SEARCH */}
        <div className="p-4">

          <div
            className="
              h-14
              rounded-2xl
              border
              border-[#E3F0F3]
              bg-[#F8FCFD]
              flex
              items-center
              px-4
              gap-3
            "
          >
            <Search
              size={20}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Mesaj ara..."
              className="
                flex-1
                bg-transparent
                outline-none
                text-slate-700
              "
            />
          </div>
        </div>

        {/* CHAT LIST */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {messages.map((item) => (

            <div
              key={item.id}
              onClick={() => setActiveChat(item)}
              className={`
                rounded-3xl
                border
                p-4
                flex
                items-center
                gap-4
                cursor-pointer
                transition-all
                hover:shadow-lg
                ${
                  activeChat?.id === item.id
                    ? "bg-[#F2FBFD] border-[#BDE7EF]"
                    : "bg-white border-[#E5F2F5]"
                }
              `}
            >

              {/* AVATAR */}
              <div
                className="
                  relative
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#67C6D3]
                  to-[#0891B2]
                  flex
                  items-center
                  justify-center
                  text-white
                  font-black
                  text-xl
                  shadow-lg
                "
              >
                {item.name.charAt(0)}

                <span
                  className="
                    absolute
                    bottom-0
                    right-0
                    w-4
                    h-4
                    rounded-full
                    bg-emerald-400
                    border-2
                    border-white
                  "
                />
              </div>

              {/* TEXT */}
              <div className="flex-1">

                <div className="flex items-center gap-2">

                  <h3 className="font-black text-slate-800 text-lg">
                    {item.name}
                  </h3>

                  <span
                    className="
                      text-[10px]
                      px-2
                      py-1
                      rounded-full
                      bg-[#EAF8FB]
                      text-[#0891B2]
                      font-bold
                    "
                  >
                    {item.role}
                  </span>
                </div>

                <p className="text-slate-500 mt-1">
                  {
                      item.conversation?.[
                        item.conversation.length - 1
                      ]?.text
}
                </p>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-2">

                <span className="text-xs text-slate-400">
                  {item.time}
                </span>

                {item.unread && (
                  <div
                    className="
                      w-3
                      h-3
                      rounded-full
                      bg-cyan-400
                    "
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        className="
          flex-1
          bg-white
          rounded-[36px]
          border
          border-[#DCEFF3]
          shadow-sm
          overflow-hidden
          flex
          flex-col
        "
      >

        {!activeChat ? (

          /* EMPTY STATE */
          <div className="flex-1 flex flex-col items-center justify-center">

            <div
              className="
                w-28
                h-28
                rounded-[32px]
                bg-[#F2FBFD]
                flex
                items-center
                justify-center
                mb-6
              "
            >
              <MessageCircle
                size={48}
                className="text-[#0891B2]"
              />
            </div>

            <h2 className="text-3xl font-black text-slate-700">
              Sohbet Seçin
            </h2>

            <p className="text-slate-400 mt-3">
              Mesajlaşmaya başlamak için soldan bir konuşma seçin.
            </p>
          </div>

        ) : (

          <>
            {/* CHAT HEADER */}
            <div
              className="
                p-6
                border-b
                border-[#EDF5F7]
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  relative
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#67C6D3]
                  to-[#0891B2]
                  flex
                  items-center
                  justify-center
                  text-white
                  font-black
                  text-xl
                "
              >
                {activeChat.name.charAt(0)}

                <span
                  className="
                    absolute
                    bottom-0
                    right-0
                    w-4
                    h-4
                    rounded-full
                    bg-emerald-400
                    border-2
                    border-white
                  "
                />
              </div>

              <div>

                <h2 className="text-2xl font-black text-slate-800">
                  {activeChat.name}
                </h2>

                <p className="text-emerald-500 font-semibold mt-1">
                  {activeChat.status}
                </p>
              </div>
            </div>

            {/* CHAT BODY */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">

              {activeChat.conversation?.map((msg, i) => (

                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "me"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`
                      max-w-[420px]
                      rounded-3xl
                      px-6
                      py-4
                      text-[15px]
                      leading-relaxed
                      shadow-sm
                      ${
                        msg.sender === "me"
                          ? "bg-gradient-to-br from-[#0891B2] to-[#0E7490] text-white"
                          : "bg-[#F2FBFD] text-slate-700"
                      }
                    `}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div
              className="
                p-5
                border-t
                border-[#EDF5F7]
                flex
                items-center
                gap-4
              "
            >

              <input
                type="text"
                placeholder="Mesaj yaz..."
                className="
                  flex-1
                  h-14
                  rounded-2xl
                  bg-[#F7FCFD]
                  border
                  border-[#E4F2F5]
                  px-5
                  outline-none
                "
              />

              <button
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#0891B2]
                  to-[#0E7490]
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  hover:scale-105
                  transition-all
                  flex-shrink-0
                "
              >
                <Send size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;