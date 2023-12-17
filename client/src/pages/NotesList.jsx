// NotesList.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import axios from 'axios';
import {
  setNotes,
  selectNotes,
  selectCurrentNote,
  setCurrentNote,
} from '../redux/notesSlice';
import EditModal from '../components/EditModal';

const NotesList = () => {
  const dispatch = useDispatch();
  const userNotes = useSelector(selectNotes);
  const currentNote = useSelector(selectCurrentNote);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:8000/api/listnotes',
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );
        dispatch(setNotes(response.data.notes));
      } catch (error) {
        console.error('Error fetching user notes:', error);
      }
    };

    fetchNotes();
  }, [dispatch]);

  const handleEdit = async (noteId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getnote/${noteId}`,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );
      dispatch(setCurrentNote(response.data.note)); // Use setCurrentNote to dispatch the action
      setShowEditModal(true);
    } catch (error) {
      console.error('Error fetching note by ID:', error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  const handleDelete = async (noteId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/deletenote/${noteId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      const response = await axios.get('http://localhost:8000/api/listnotes', {
        headers: {
          'x-auth-token': token,
        },
      });
      dispatch(setNotes(response.data.notes));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  return (
    <Stack>
      <h2>Your Notes</h2>
      <ListGroup>
        {userNotes?.map((note) => (
          <Card key={note._id} className='mb-3'>
            <Card.Body>
              <Card.Title>{note.note}</Card.Title>
              <Card.Text>
                Created At: {new Date(note.createdAt).toLocaleString()}
              </Card.Text>
              <div className='d-flex justify-content-end'>
                <IoMdCreate
                  className='me-2'
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleEdit(note._id)}
                />
                <IoMdTrash
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(note._id)}
                />
              </div>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>

      <EditModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        currentNote={currentNote}
      />
    </Stack>
  );
};

export default NotesList;
