import React, { useState } from "react";

import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ArticleList from "components/articleList";
import Pagenation from "components/pagenation";
import { fetchArticleList } from "actions";
import { RootState } from "reducers";

const NEWS_API = process.env.REACT_APP_API_KEY;

const Main: React.FC<RouteComponentProps> = (props) => {
  const [word, setWord] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(4);
  const { articles } = useSelector((state: RootState) => state.ArticleReducer);
  const dispatch = useDispatch();

  const indexOfLastArticle = currentPage * postsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - postsPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const searchArticles = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?apiKey=${NEWS_API}&q=${word}`
      );
      dispatch(fetchArticleList(res.data.articles));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainWrapper>
      <Nav>
        <NavButton>즐겨찾기</NavButton>
        <NavButton onClick={() => props.history.push("/signin")}>
          로그인
        </NavButton>
      </Nav>
      <SearchWrapper>
        <SearchInput
          onChange={(e) => setWord(e.target.value)}
          onKeyPress={(e) => {
            e.key === "Enter" && searchArticles();
          }}
        />
        <SearchButton onClick={searchArticles}>검색</SearchButton>
      </SearchWrapper>
      <ArticleList articles={currentArticles} />
      <Pagenation
        totalArticles={articles.length}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        paginate={paginate}
      />
    </MainWrapper>
  );
};
export default Main;

const MainWrapper = styled.main``;

const SearchWrapper = styled.section`
  display: flex;
  margin: 3rem 0;
`;

const SearchInput = styled.input``;

const SearchButton = styled.button``;

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 40px;
`;

const NavButton = styled.button`
  display: block;
  padding-left: 24px;
  background: none;
  font-size: 20px;
  &:hover {
    color: #0032bc;
    font-weight: 600;
  }
`;
