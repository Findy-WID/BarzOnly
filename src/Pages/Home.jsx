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
