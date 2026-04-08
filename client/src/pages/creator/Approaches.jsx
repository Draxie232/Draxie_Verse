import React, { useState, useEffect } from 'react';
import { User, ChevronRight, ArrowLeft, Send } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const Approaches = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUserEmail = localStorage.getItem("userEmail");

  const [socket, setSocket] = useState(null); 
  const [activeChat, setActiveChat] = useState(null); 
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  
  // --- NEW: Real Inbox State ---
  const [inboxList, setInboxList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. FETCH INBOX & INIT SOCKET ---
  useEffect(() => {
    if (!currentUserEmail) {
      navigate('/login'); 
      return;
    }

    // Fetch the real inbox list from MongoDB
    const fetchInbox = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/inbox/${currentUserEmail}`);
        const data = await res.json();
        if (res.ok) setInboxList(data.inbox || []);
      } catch (error) {
        console.error("Error fetching inbox:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInbox();

    // Init Socket
    const newSocket = io(`${import.meta.env.VITE_API_URL}`);
    setSocket(newSocket);

    newSocket.on("receive_message", (data) => {
      // If we are actively chatting with the person who sent it, show it instantly
      setMessageList((list) => [...list, data]);
      // (You can also update the inboxList here in the future so the latest message pops to the top!)
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentUserEmail, navigate]);

  // --- 2. AUTO-OPEN CHAT FROM VIDEO FEED ---
  useEffect(() => {
    if (socket && location.state?.autoOpenChat) {
      const targetUser = location.state.autoOpenChat;
      openChat(targetUser); // Use the openChat function to load history
      navigate('.', { replace: true, state: null });
    }
  }, [socket, location.state, navigate]);

  // --- HANDLERS ---
  const openChat = async (approachInfo) => {
    setActiveChat(approachInfo);
    setMessageList([]); // Clear screen temporarily
    
    // Join the private socket room
    const room = [currentUserEmail, approachInfo.email].sort().join("_");
    if (socket) socket.emit("join_chat", room);
    
    // --- NEW: Fetch Real Chat History ---
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/history/${currentUserEmail}/${approachInfo.email}`);
      const data = await res.json();
      if (res.ok) {
        setMessageList(data.messages || []);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const sendMessage = async () => {
    if (currentMessage.trim() !== "" && activeChat && socket) {
      const room = [currentUserEmail, activeChat.email].sort().join("_");
      
      const messageData = {
        room: room,
        sender: currentUserEmail,
        receiver: activeChat.email,
        text: currentMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      // Emit to server (server will now save it to DB!)
      await socket.emit("send_message", messageData);
      
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  if (!currentUserEmail) return null; 

  return (
    <div className="min-h-screen bg-[#0a0610] text-white p-5 pb-24 relative overflow-hidden flex justify-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-fuchsia-900/10 blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 flex flex-col">
        
        {/* VIEW 1: THE INBOX LIST */}
        {!activeChat ? (
          <>
            <div className="flex items-center gap-3 mb-6 mt-2">
              <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.8)]"></div>
              <h1 className="text-[22px] font-black tracking-wide text-white">Approaches</h1>
            </div>

            {isLoading ? (
               <div className="flex justify-center mt-10"><span className="animate-spin w-8 h-8 border-4 border-fuchsia-500 border-t-transparent rounded-full"></span></div>
            ) : inboxList.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                <p>Your inbox is empty.</p>
                <p className="text-sm mt-2">Start approaching creators from the feed!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inboxList.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => openChat(item)}
                    className="flex items-center justify-between p-4 rounded-2xl bg-[#15111a] border border-[#2a2432] transition-all duration-300 hover:border-fuchsia-500/40 hover:bg-[#1a1520] cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 shrink-0 rounded-full bg-[#221c2b] flex items-center justify-center border border-[#332b40] relative">
                        <User size={20} className="text-gray-400" />
                        {item.unread && (
                          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-fuchsia-500 border-2 border-[#15111a]"></span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-extrabold text-gray-100 text-[17px] tracking-wide">{item.user}</h3>
                        <p className="text-[13px] text-gray-400 mt-0.5 italic line-clamp-1">"{item.message}"</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-[10px] font-bold tracking-wider text-fuchsia-400/80 uppercase">{item.time}</span>
                      <div className="w-8 h-8 rounded-xl bg-[#221c2b] flex items-center justify-center transition-colors hover:bg-[#2d2538]">
                        <ChevronRight size={16} className={item.unread ? "text-fuchsia-400" : "text-gray-500"} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          
        /* VIEW 2: THE REAL-TIME CHAT ROOM */
          <div className="flex flex-col h-[85vh]">
            
            <div className="flex items-center gap-4 pb-4 border-b border-[#2a2432] mb-4">
              <button 
                onClick={() => {
                  setActiveChat(null);
                  // Quick trick to refresh inbox when leaving a chat
                  window.location.reload(); 
                }}
                className="w-10 h-10 rounded-full bg-[#15111a] flex items-center justify-center border border-[#2a2432] hover:bg-[#221c2b] transition-colors"
              >
                <ArrowLeft size={18} className="text-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#221c2b] flex items-center justify-center border border-[#332b40]">
                  <User size={18} className="text-gray-400" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-[16px]">{activeChat.user}</h3>
                  <span className="text-xs text-fuchsia-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse"></span>
                    Online
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 mb-4 pb-4">
              {messageList.length === 0 && (
                 <div className="text-center text-gray-500 mt-10 italic text-sm">This is the beginning of your conversation.</div>
              )}
              {messageList.map((msg, index) => {
                const isMe = msg.sender === currentUserEmail;
                return (
                  <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className={`p-3.5 rounded-2xl max-w-[80%] text-[14px] flex flex-col gap-1 shadow-md ${
                      isMe 
                        ? "bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white rounded-tr-sm" 
                        : "bg-[#15111a] border border-[#2a2432] text-gray-200 rounded-tl-sm"
                    }`}>
                      <span>{msg.text}</span>
                      <span className={`text-[10px] font-bold self-end ${isMe ? "text-fuchsia-200" : "text-gray-500"}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative flex items-center">
              <input 
                type="text" 
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full bg-[#15111a] border border-[#2a2432] text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-fuchsia-500/50 transition-colors pr-14"
              />
              <button 
                onClick={sendMessage}
                className="absolute right-2 w-10 h-10 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 flex items-center justify-center transition-colors shadow-[0_0_10px_rgba(217,70,239,0.4)]"
              >
                <Send size={16} className="text-white ml-0.5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Approaches;