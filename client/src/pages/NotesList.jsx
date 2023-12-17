import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import axios from 'axios';
import { setNotes, selectNotes } from '../redux/notesSlice';

const NotesList = () => {
  const dispatch = useDispatch();
  const userNotes = useSelector(selectNotes);

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
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user notes:', error);
      }
    };

    fetchNotes();
  }, [dispatch]);

  const handleEdit = (noteId) => {
    console.log('Edit note with ID:', noteId);
  };

  const handleDelete = (noteId) => {
    console.log('Delete note with ID:', noteId);
  };

  return (
    <Stack>
      <h2>Your Notes</h2>
      <ListGroup>
        {userNotes.map((note) => (
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
    </Stack>
  );
};

export default NotesList;
