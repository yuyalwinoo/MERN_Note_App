const express = require('express');

const { addNote, updateNote, getNoteById, deleteNote, getAllNote, updateIsPinned, deleteSelectedNotes } = require('../controllers/NotesController');
const { noteValidator, handleValidation, noteDeleteManyValidator } = require('../middleware/validation');

const router = express.Router();

router.get('/',getAllNote);
router.get('/:id',getNoteById);
router.post('/',noteValidator, handleValidation, addNote);
router.put('/:id',noteValidator, handleValidation, updateNote);
router.put('/update-is-pinned/:id',updateIsPinned);
router.delete('/:id',deleteNote);
router.delete('/delete-notes/',noteDeleteManyValidator, handleValidation, deleteSelectedNotes);

module.exports = router;
