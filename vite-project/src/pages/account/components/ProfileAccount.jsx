import { useState, useEffect, useContext } from "react";
import { toast, Toaster } from "sonner";
import supabase from "../../../supabase/client";
import SessionContext from "../../../context/sessionContext";
import Avatar from "./Avatar";

export default function ProfileAccount() {
  const { session } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);


  const [originalProfile, setOriginalProfile] = useState({});

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, first_name, last_name, avatar_url`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
          setOriginalProfile(data);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    if (
      username === originalProfile.username &&
      first_name === originalProfile.first_name &&
      last_name === originalProfile.last_name &&
      avatarUrl === originalProfile.avatar_url
    ) {
      toast.info("Nothing to update");
      return;
    }

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      toast.error(error.message);
    } else {
      setAvatarUrl(avatarUrl);
      setOriginalProfile({
        username,
        first_name,
        last_name,
        avatar_url: avatarUrl,
      });
      toast.success("Profilo aggiornato con successo!");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="container-fluid">
        <Toaster position="bottom-center" />
        <form onSubmit={updateProfile} className="form-widget ">
          <Avatar
            url={avatar_url}
            onUpload={(event, url) => updateProfile(event, url)}
            size={150}
            allowUpload={true}
          />
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={session.user.email} disabled />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              required
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="first_name">First name</label>
            <input
              id="first_name"
              type="text"
              value={first_name || ""}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="last_name">Last name</label>
            <input
              id="last_name"
              type="text"
              value={last_name || ""}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mt-3">
            <button
              className="button block primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update"}
            </button>
          </div>

          <div className="mt-3">
            <button
              className="button block"
              type="button"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
