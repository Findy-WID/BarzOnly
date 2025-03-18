import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";

const MySwal = withReactContent(Swal);

export default function MusicPlayerModal({ song, onClose }) {
  useEffect(() => {
    if (!song) return;

    MySwal.fire({
      title: `<h3>${song.title}</h3>`,
      html: `
        <p><strong>Artist:</strong> ${song.artist.name}</p>
        <img src="${song.album.cover_medium}" alt="${song.title}" style="width:100%; border-radius:8px; margin-bottom:10px;">
        <audio controls autoplay style="width:100%;">
          <source src="${song.preview}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      `,
      showConfirmButton: false,
      allowOutsideClick: true,
      didClose: onClose, // Close modal when dismissed
    });
  }, [song, onClose]);

  return null; // No extra UI needed, SweetAlert2 handles it
}
