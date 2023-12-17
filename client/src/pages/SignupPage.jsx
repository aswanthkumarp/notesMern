import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectAuthState } from '../redux/AuthSlice';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const isAuthenticated = useSelector(selectAuthState);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsFormValid(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        fullName,
        email,
        password,
      });
      console.log('signup successfull', response.data);
      setIsFormValid(true);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div>
      <Container className='d-flex justify-content-center align-items-center bg-light'>
        <div className='bg-white p-5 border shadow-lg ml-0'>
          <h1 className='mb-2'>Signup</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicUsername'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Full Name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={handleEmailChange}
                required
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
                onChange={handlePasswordChange}
                required
                minLength={8} // Example: Set a minimum length for the password
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicRePassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {!isFormValid && (
                <Form.Text className='text-danger'>
                  Passwords do not match.
                </Form.Text>
              )}
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default SignupPage;
