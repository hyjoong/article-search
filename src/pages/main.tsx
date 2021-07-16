import React, { useState } from "react";

import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ArticleList from "components/articleList";
import Pagenation from "components/pagenation";
import { fetchArticleList } from "actions";
import { RootState } from "reducers";
import Nav from "../components/nav";

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
      <Nav />

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

const MainWrapper = styled.main`
  width: 60%;
  margin: 0 auto 50px;
`;

const SearchWrapper = styled.section`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 50px auto 0;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 60px;
  padding: 10px;
  margin-right: 20px;
  font-size: 20px;
`;

const SearchButton = styled.button`
  width: 60px;
  height: 40px;
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
