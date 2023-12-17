const Notes = require('../model/notesModal');

module.exports.CreateNotes = async function (req, res) {
  try {
    const { note} = req.body;
   // notesController.js
const createdBy = req.user && req.user.userId;
if (!createdBy) {
  return res.status(401).json({ message: 'User information missing in the request' });
}

const currentDate = new Date();

    const newNote = {
      note: note,
      createdBy: createdBy,
      createdAt:currentDate
    };
    let creatednote = await Notes.create(newNote);
    return res.status(200).json({
      message: 'Note Succesfully Registered',
      createdNote: creatednote,
    });
  } catch (error) {
    console.error(1212, error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.fetchUserNotes = async function (userId) {
  try {
    console.log('Fetching notes for userId:', userId);
    const userNotes = await Notes.find({ createdBy:userId }).exec();
    return userNotes;
  } catch (error) {
    console.error('Error fetching user notes:', error);
    throw error;
  }
}

module.exports.listNotes = async function (req, res) {
  try {
    console.log('Fetching notes for userId:', req.user.userId);
    const userNotes = await module.exports.fetchUserNotes(req.user.userId);
    console.log('Fetched user notes:', userNotes);
    res.json({ notes: userNotes });
  } catch (error) {
    console.error('Error fetching user notes:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

