import { useEffect, useState, useRef } from "react";
import supabase from "../../../supabase/client";
import PulseLoader from "react-spinners/PulseLoader";
import { format } from "date-fns";


export default function RealtimeChat({ game }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messageRef = useRef(null);

  function scrollSmoothBottom() {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }

  const getInitialMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Messages")
      .select("id, profile_username, content, created_at")
      .eq("game_id", game.id);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    getInitialMessages();

    const channel = supabase
      .channel("Messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Messages",
        },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    scrollSmoothBottom();
  }, [messages]);

  if (loading) {
    return <PulseLoader className="m-5" color="#ffffff" />;
  }

  return (
    <div className="messages" ref={messageRef}>
      {error && <p className="white-1">Error: {error}</p>}
      {messages.length > 0 ? (
        messages.map((message) => (
          <article key={message.id} className="chat_message">
            <p className="chat_username">{message.profile_username}</p>
            <div className="message-content">
              <small className="message">{message.content}</small>
              {message.created_at && (
                <small className="timestamp">
                  {format(new Date(message.created_at), "dd/MM/yyyy")}
                </small>
              )}
            </div>
          </article>
        ))
      ) : (
        <p className="white-1">No messages yet</p>
      )}
    </div>
  );
}
