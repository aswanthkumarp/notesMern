import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userAuthDetails } from '../redux/AuthSlice';
const ModalComponent = ({ show, handleClose }) => {
  const [note, setNote] = useState();
  const authUser = useSelector(userAuthDetails);
  const fullName = authUser.fullName;
  const token = localStorage.getItem('token')
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      console.log('token:', token);
      const response = await axios.post(
        'http://localhost:8000/api/savenotes',
        {
          note,
          fullName,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      console.log('Note created successfully', response.data);
      handleClose();
    } catch (error) {
      console.error('error happened', error);
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <Form.Control
            size='lg'
            as='textarea'
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
