import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthenticated } from '../redux/AuthSlice';

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthState);
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://serverofnotesapp.onrender.com/api/login',
        {
          email,
          password,
        }
      );

      console.log('Response:', response);

      if (response.data && response.data.token) {
        const { data } = response;

        dispatch(setAuthenticated(data.user));

        localStorage.setItem('token', data.token);
        console.log('Login is successful', data.message);
        navigate('/dashboard');
      } else {
        console.error('Login failed. User data not found in the response.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <Container className='d-flex justify-content-center align-items-center bg-light '>
        <div className='bg-white p-5 border shadow-lg ml-0'>
          <h1 className='mb-2'>Signin</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
