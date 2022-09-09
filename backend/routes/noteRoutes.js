const express = require('express');
const {
  getAllNotes,
  createNewNote,
  deleteNote,
  updateNote,
} = require('../controllers/notesController');
const router = express.Router();

router
  .route('/')
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

module.exports = router;
