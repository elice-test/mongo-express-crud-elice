import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (e) => {

    e.preventDefault();
    // 로그인 로직 구현하기 (서버로 id와 pw 전송 등)
    console.log('로그인 버튼 클릭');
    const { email, password } = formData;

    // 서버로 로그인 정보 전송
    axios
      .post('http://localhost:3000/api/users/login', { email, password })
      .then((response) => {
        console.log('로그인 성공:', response.data);
        alert('로그인 성공');
        // navigate('/home')
        // 로그인 성공 시 다음 동작 구현 (예: 로그인 완료 페이지로 이동 등)
      })
      .catch((error) => {
        console.error('로그인 실패:', error);
        alert('비밀번호 혹은 아이디를 확인해주세요');
        // 로그인 실패 시 에러 처리 (예: 에러 메시지 출력 등)
      });
  };

  const handleSignup = () => {

    // 회원가입 페이지로 이동하는 로직 구현하기
    console.log('회원가입 버튼 클릭');
    // navigate('/signup');
    // 회원가입 정보
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Container className="my-5">
      <Card style={{ width: '18rem', margin: 'auto' }}>
        <Card.Img variant="top" src="" alt="로고이미지" />
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter ID"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              로그인
            </Button>

            <Button variant="link" onClick={handleSignup}>
              회원가입
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
