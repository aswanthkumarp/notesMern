import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalComponent from '../components/Modal';
import { FaStickyNote, FaList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCreateNotes = () => {
    setShowModal(true);
  };
  const handleCloseNotesModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Container
        className='d-flex flex-column align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <Row>
          <Col xs={12} md={6} className='mb-3'>
            <div className='border p-3 d-flex flex-column align-items-center'>
              <FaStickyNote size={40} className='mb-2' />
              <Button size='lg' onClick={handleCreateNotes}>
                Create Notes
              </Button>
            </div>
          </Col>

          <Col xs={12} md={6} className='mb-3'>
            <div className='border p-3 d-flex flex-column align-items-center'>
              <FaList size={40} className='mb-2' />
              <Button size='lg' onClick={()=>navigate('/list')}>View Notes</Button>
            </div>
          </Col>
        </Row>
      </Container>
      <ModalComponent show={showModal} handleClose={handleCloseNotesModal} />
    </>
  );
};

export default Dashboard;
