import { useState, useEffect } from "react";
import supabase from "../supabase/client";
import SessionContext from "./sessionContext";


export default function SessionContextProvider({children}) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      const {data} = await supabase.auth.getSession()
      setSession(data.session);
      setLoading(false);
    }
    fetchSession();
    const {data: { subscription }} = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setSession(null)
        } else if (session) {
          setSession(session)
        }
      })
      return () => {
        subscription.unsubscribe()
      }
    }, [])
      useEffect(() => {
        async function getUser() {
          const {data: { user }} = await supabase.auth.getUser()
          setUser(user);
        }
        getUser();
    }, [session])
  return (
    <SessionContext.Provider value={{session, user, loading}}>
      {children}
    </SessionContext.Provider>
  )
}