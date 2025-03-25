import RealtimeChat from "./RealtimeChat";
import { toast, Toaster } from "sonner";
import supabase from "../../../supabase/client";

export default function Chat({ game, session }) {
  async function handleMessageSubmit(event) {
    event.preventDefault();
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));
    if (typeof message === "string" && message.trim().length !== 0) {
      const { data, error } = await supabase
        .from("Messages")
        .insert([
          {
            profile_id: session.user.id,
            profile_username: session.user.user_metadata.username,
            game_id: game.id,
            content: message,
          },
        ])
        .select();
      if (error) {
        toast.error(error.message);
        console.log(error);
      } else {
        toast.success("Message sent successfully!");
        inputMessage.reset();
        console.log(data, "Risposta messaggio");
      }
    }
  }

  return (
    <>
      <div className="chat_game_container ">
        <RealtimeChat game={game} />
        <div className="message_form_wrapper">
          <form onSubmit={handleMessageSubmit}>
            <fieldset role="group">
              <input type="text" name="message" placeholder="Chat..." />
              <input type="submit" value="Send" />
            </fieldset>
          </form>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
}
