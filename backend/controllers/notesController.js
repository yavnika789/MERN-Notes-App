import mongoose from "mongoose";
import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    //  Only find notes where the user field matches the logged-in user
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    //  Attach the user ID from the token to the new note
    const note = new Note({ 
      title, 
      content, 
      user: req.user.id 
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    // Ensure the note belongs to the user before updating
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, 
      { title, content },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ message: "Note not found or unauthorized" });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    // Find note that matches the ID AND belongs to this user
    const note = await Note.findOne({ _id: id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;

    // Only delete if the ID matches AND it belongs to the logged-in user
    const deletedNote = await Note.findOneAndDelete({ _id: id, user: req.user.id });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}