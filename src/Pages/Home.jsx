// import { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const MySwal = withReactContent(Swal);

// export default function Home({ isLoggedIn }) {
//   const [categories, setCategories] = useState({
//     trending: [],
//     pop: [],
//     hiphop: [],
//     rock: [],
//   });

//   useEffect(() => {
//     const fetchMusic = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/music");
//         console.log("API Response:", response.data);
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching music:", error.message);
//       }
//     };

//     fetchMusic();
//   }, []);

//   return (
//     <div>
//       <h2 style={{ textAlign: "center" }}>Trending</h2>
//       <MusicList songs={categories.trending} isLoggedIn={isLoggedIn} />

//       <h2 style={{ textAlign: "center" }}>Pop</h2>
//       <MusicList songs={categories.pop} isLoggedIn={isLoggedIn} />

//       <h2 style={{ textAlign: "center", color: "#5bc5f4" }}>Hip-Hop</h2>
//       <MusicList songs={categories.hiphop} isLoggedIn={isLoggedIn} />

//       <h2 style={{ textAlign: "center", color: "#5bc5f4" }}>Rock</h2>
//       <MusicList songs={categories.rock} isLoggedIn={isLoggedIn} />
//     </div>
//   );
// }

// function MusicList({ songs, isLoggedIn }) {
//   const handleSongClick = (song) => {
//     if (!isLoggedIn) {
//       alert("Please login or create an account");
//       return;
//     }

//     // Open the music player modal
//     MySwal.fire({
//       title: `<h3>${song.title}</h3>`,
//       html: `
//         <p><strong>Artist:</strong> ${song.artist.name}</p>
//         <img src="${song.album.cover_medium}" alt="${song.title}" style="width:100%; border-radius:8px; margin-bottom:10px;">
//         <audio controls autoplay style="width:100%;">
//           <source src="${song.preview}" type="audio/mpeg">
//           Your browser does not support the audio element.
//         </audio>
//       `,
//       showConfirmButton: false,
//       allowOutsideClick: true,
//     });
//   };

//   return (
//     <div style={{ 
//       display: "flex", 
//       flexWrap: "wrap", 
//       gap: "20px", 
//       justifyContent: "center",
//       padding: "20px" 
//     }}>
//       {songs && songs.length > 0 ? (
//         songs.map((song) => (
//           <div
//             key={song.id}
//             onClick={() => handleSongClick(song)}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               width: "180px",
//               padding: "10px",
//               borderRadius: "10px",
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//               textAlign: "center",
//               cursor: "pointer",
//               transition: "transform 0.2s ease-in-out",
//               background: "#111",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//             onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           >
//             <img
//               src={song.album.cover_medium}
//               alt={song.title}
//               style={{ 
//                 width: "100%", 
//                 height: "180px", 
//                 objectFit: "cover", 
//                 borderRadius: "8px" 
//               }}
//             />
//             <p style={{ 
//               fontWeight: "bold", 
//               marginTop: "5px", 
//               fontSize: "16px", 
//               color: "#fff" 
//             }}>
//               {song.title}
//             </p>
//             <p style={{ 
//               color: "#bbb", 
//               fontSize: "14px" 
//             }}>
//               {song.artist.name}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../Styles/Home.css"

const MySwal = withReactContent(Swal);

export default function Home({ isLoggedIn }) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const audioRefs = useRef(new Map());

  const fetchSongs = async (pageNum) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://robo-music-api.onrender.com/music/my-api?page=${pageNum}`
      );
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setSongs((prev) => [...prev, ...response.data]);
      }
    } catch (error) {
      console.error("Error fetching music:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs(page);
  }, [page]);

  const handleNextPage = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePlay = (id) => {
    if (currentlyPlaying !== id) {
      // Pause all other audio elements
      audioRefs.current.forEach((audio, audioId) => {
        if (audioId !== id && !audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      setCurrentlyPlaying(id);
    }
  };

  return (
    <div className="home-container">
      <h2 className="section-title">Music Library</h2>
      <div className="music-grid">
        {songs.length > 0 ? (
          songs.map((song) => (
            <div
              key={song.id}
              className={`music-card ${
                currentlyPlaying === song.id ? "playing" : ""
              }`}
            >
              <img
                src={song.songImage}
                alt={song.songTitle}
                className="music-thumbnail"
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />
              <h3 className="music-title">{song.songTitle}</h3>
              <p className="music-artist">{song.artistName}</p>
              <audio
                controls
                src={song.songUrl}
                ref={(el) => {
                  if (el) audioRefs.current.set(song.id, el);
                  else audioRefs.current.delete(song.id);
                }}
                onPlay={() => handlePlay(song.id)}
              />
            </div>
          ))
        ) : (
          <p className="loading-text">{loading ? "Loading..." : "No songs found"}</p>
        )}
      </div>

      {hasMore && (
        <button onClick={handleNextPage} disabled={loading} className="load-more">
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
