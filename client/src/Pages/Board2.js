import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import '../styles/Board.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const Board = () => {
    const [posts, setPosts] = useState([
        { id: 1, title: '게시글 1', author: '글쓴이 1', date: '2023-09-01', views: 100, likes: 20, content: '게시글 내용 1' },
        { id: 2, title: '게시글 2', author: '글쓴이 2', date: '2023-09-02', views: 150, likes: 30, content: '게시글 내용 2' },
        // 다른 게시글 데이터 추가
    ]);

    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Axios를 사용하여 GET 요청을 보냅니다.
        axios.get('http://localhost:3000/api/posts')
          .then(response => {
            // 요청이 성공하면 데이터를 상태(state)에 저장합니다.
            console.log(response.data);
            setPosts(response.data);
          })
          .catch(error => {
            // 요청이 실패하면 에러를 처리합니다.
            console.error('GET 요청에 실패했습니다:', error);
          });
      }, []);




    const handlePostClick = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setSelectedPost(null);
        setShowModal(false);
    };
    const [newPost, setNewPost] = useState({ title: '', author: '', content: '' });
    const handleSavePost = () => {
        setPosts([...posts, newPost]);
        setShowModal(false);
    };


    return (
        <div>
            <Button onClick={handleShowModal}>글쓰기</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>날짜</th>
                        <th>조회수</th>
                        <th>좋아요 개수</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post._id} onClick={() => handlePostClick(post.content)}>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>{post.createdAt}</td>
                            <td>{post.view}</td>
                            <td>{post.likes}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPost ? '글 수정' : '글 쓰기'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="제목을 입력하세요"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="author">
                            <Form.Label>글쓴이</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="글쓴이를 입력하세요"
                                value={newPost.author}
                                onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="내용을 입력하세요"
                                value={newPost.content}
                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={handleSavePost}>
                        저장
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Board;
