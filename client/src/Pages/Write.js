import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Edit.css';
import { Form, Card, Container, Button } from 'react-bootstrap';

function Write() {
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        category: [],
        author:''
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
    const handleEdit = async () => {
        console.log("바꿀 내용 : ",newPost);
        await axios.post(`http://localhost:3000/api/posts`, newPost)
            .then(response => {
                // 요청이 성공했을 때의 동작
                console.log('성공적으로 PUT 요청을 보냈습니다.', response.data);
                alert("수정되었습니다.");
                navigate(-1);
                
            })
            .catch(error => {
                // 요청이 실패했을 때의 동작
                console.error('PUT 요청에 실패했습니다.', error);
            });
    };

    return (
        <>
            {newPost ? (
                <div>
                    <Card className="border border-light-subtle hadow p-3 mb-5 bg-body-tertiary rounded">
                        <Container>
                            <h1 className="mt-4">새 글 쓰기</h1>
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
                                <Form.Group controlId="author">
                                    <Form.Label>등록할 아이디</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="author"
                                        value={newPost.author}
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
                                    {['게임', '요리', '독서', '취미', '운동', '공부', '기타', '일상'].map((category) => (
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
                                <br/>
                                <Button variant="primary" onClick={handleEdit}>
                                    등록
                                </Button>
                                <Button className='ms-2' variant="danger" onClick={()=>{navigate(-1)}}>
                                    뒤로가기
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

export default Write;
