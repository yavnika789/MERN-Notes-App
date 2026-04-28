import { useState, useEffect } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";


const HomePage = ({ user }) => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchNotes = async () => {
    // 1. Check if token exists in localStorage
    const token = localStorage.getItem("token"); 
    if (!token) {
      setLoading(false);
      setNotes([]);
      return;
    }

    try {
      const res = await api.get("/notes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data);
    } catch (error) {
      if (error?.status === 429) setIsRateLimited(true);
      else toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  fetchNotes();
}, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {user && (
        <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
          <h2 className="text-4xl font-bold">Hello, <span className="text-primary">{user.name}</span></h2>
          <p className="text-base-content/60 mt-2">Here are your latest thoughts and brain-dumps.</p>
        </div>
      )}

      {isRateLimited && <RateLimitedUI />}

      <div className="mt-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="loading loading-ring loading-lg text-primary"></span>
            <p className="text-base-content/40 font-medium">Fetching your notes...</p>
          </div>
        )}

        {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;