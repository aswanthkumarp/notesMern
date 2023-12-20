import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setNotes } from '../redux/notesSlice';

const EditModal = ({ show, handleClose, currentNote }) => {
  const [updatedNote, setUpdatedNote] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedNote(currentNote?.note || '');
  }, [currentNote]);

  const handleSave = async (currentNote) => {
    console.log('Current Note:', currentNote);
    if (!currentNote || !currentNote._id) {
      console.error('Invalid note ID');
      handleClose();
      return;
    }

    console.log('Updating note with ID:', currentNote._id);

    try {
      const token = localStorage.getItem('token');
      console.log(currentNote._id, 'id of note');
      const response = await axios.put(
        `https://serverofnotesapp.onrender.com/api/updatenote/${currentNote._id}`,
        { note: updatedNote },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      console.log('Updated note:', response.data.note);
      dispatch(setNotes(response.data.notes));
    } catch (error) {
      console.error('Error updating note in the database:', error);
      setError('Error updating note in the database');
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <Form.Control
            size='lg'
            as='textarea'
            value={updatedNote}
            onChange={(e) => setUpdatedNote(e.target.value)}
          />
        </InputGroup>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={() => handleSave(currentNote)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
