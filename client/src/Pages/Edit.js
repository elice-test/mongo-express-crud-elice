import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Edit.css';
import { Form, Card, Container, Row, Col, Button } from 'react-bootstrap';

function Edit() {
  const { user_id, post_id } = useParams();
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: [],
  });

  // 입력 필드 값이 변경될 때 상태 업데이트
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  // 카테고리를 선택할 때 상태 업데이트
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setNewPost({
        ...newPost,
        category: [...newPost.category, value],
      });
    } else {
      setNewPost({
        ...newPost,
        category: newPost.category.filter((category) => category !== value),
      });
    }
  };

  // 수정 버튼을 클릭할 때의 동작 (PUT 요청 등을 수행)
  const handleEdit = () => {
    // newPost를 사용하여 수정 작업 수행
    // 예: axios.put(`/api/posts/${postId}`, newPost)
    // 성공적으로 수정되면 다른 페이지로 이동하거나 알맞은 동작 수행
  };

  return (
    <>
      {newPost ? (
        <div>
          <Card className="border border-light-subtle hadow p-3 mb-5 bg-body-tertiary rounded">
            <Container>
              <h1 className="mt-4">글 수정 페이지</h1>
              <Form>
                <Form.Group controlId="title">
                  <Form.Label>제목</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="content">
                  <Form.Label>내용</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="5"
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="category">
                  <Form.Label>카테고리(복수 응답 가능)</Form.Label>
                  {['게임', '요리', '독서','취미','운동','공부','기타','일상'].map((category) => (
                    <Form.Check
                      key={category}
                      type="checkbox"
                      label={category}
                      value={category}
                      onChange={handleCategoryChange}
                      checked={newPost.category.includes(category)}
                    />
                  ))}
                </Form.Group>
                <Button variant="primary" onClick={handleEdit}>
                  수정
                </Button>
              </Form>
            </Container>
          </Card>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Edit;
