import { useEffect, useState } from "react";
import supabase from "../../../supabase/client";

export default function Avatar({
  url,
  size = 50,
  allowUpload = false,
  onUpload,
}) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .getPublicUrl(path);

      if (error) throw error;

      setAvatarUrl(data.publicUrl);
    } catch (error) {
      console.error("Errore nel recupero dell'URL pubblico:", error.message);
    }
  }

  async function uploadAvatar(event) {
    if (!allowUpload) return;

    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Devi selezionare un'immagine da caricare.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = await supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      onUpload(event, data.publicUrl);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mb-3">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image mb-3"
          style={{ height: size, width: size, borderRadius: "50%" }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{
            height: size,
            width: size,
            backgroundColor: "#ccc",
            borderRadius: "50%",
          }}
        />
      )}

      {allowUpload && (
        <div style={{ width: size }}>
          <input
            className="file_upload"
            type="file"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
}
