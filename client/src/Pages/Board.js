import React, { useEffect, useState } from 'react';
import { Button, Table, Card } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import '../styles/Board.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function formatDate(inputDate) {
  const formattedDate = dayjs(inputDate).format('YYYY-MM-DD HH:mm');
  return formattedDate;
}

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const perpage = 10; // 페이지당 항목 수 (고정)
  const [maxPage, setMaxPage] = useState(100);

  const fetchData = () => {
    console.log("페이지요청 시작", currentPage, perpage);
    if (currentPage == 0) {
      setCurrentPage(1)
      return;
    }
    else if (currentPage > maxPage) {
      setCurrentPage(crnt => crnt - 1)
      return;
    }
    axios
      .get(`http://localhost:3000/api/posts?page=${currentPage}&perpage=${perpage}`)
      .then((response) => {
        setPosts(response.data.posts);
        setMaxPage(response.data.totalPages)
      })
      .catch((error) => {
        console.error('GET 요청에 실패했습니다:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]); // currentPage가 변경될 때마다 데이터 다시 가져오기

  const handlePageChange = (page) => {
    setCurrentPage((crnt) => page);
  };

  return (
    <Card>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>날짜</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post,index) => (
            <tr key={post._id}>
              <td>{(currentPage-1)*10+index+1}</td>
              <td>
                <Link style={{textDecoration:'None'}}  to={`/posts/${post._id}`}>{post.title}</Link>
              </td>
              <td>{post.author}</td>
              <td>{formatDate(post.createdAt)}</td>
              <td>{post.view}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 페이지네이션 컴포넌트 */}
      <div className='text-center'>
        <Button className="opacity-75" onClick={() => { handlePageChange(currentPage - 1) }}>이전</Button>
        {currentPage}
        <Button className="opacity-75" onClick={() => { handlePageChange(currentPage + 1) }} >다음</Button>
      </div>
      <span className='text-end'>
        <Button >글쓰기</Button>
      </span>
    </Card>
  );
};

export default Board;
