import React from "react";
import styled from "styled-components";
import { Article } from "store/types";
import { useDispatch } from "react-redux";
import { sortArticleList } from "actions";

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = (props) => {
  const { articles } = props;
  const dispatch = useDispatch();
  return (
    <ArticleListWrapper>
      <SortButtonWrapper>
        <SortButton onClick={() => dispatch(sortArticleList(0))}>
          날짜
        </SortButton>
        <SortButton onClick={() => dispatch(sortArticleList(1))}>
          출처
        </SortButton>
      </SortButtonWrapper>
      {articles.map((article, idx) => (
        <ArticleContainer key={idx} onClick={() => window.open(article.url)}>
          <Title>{article.title}</Title>
          <Content>
            <div>{article.author}</div>
            <div>{article.publishedAt}</div>
          </Content>
          <Content>
            <img src={article.urlToImage} alt="" />
            <div>{article.content}</div>
          </Content>
          <div>출처 :{article.source.name}</div>
        </ArticleContainer>
      ))}
    </ArticleListWrapper>
  );
};
export default ArticleList;

const ArticleListWrapper = styled.main`
  margin: 50px 0;
`;

const ArticleContainer = styled.div`
  margin: 80px 30px;
  padding: 20px;
  border: 1px solid #ededed;
  border-radius: 20px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;
const Content = styled.div`
  display: flex;
  padding-top: 20px;
  .author {
    padding-right: 10px;
  }
  img {
    width: 300px;
    padding: 0 20px 20px 0;
  }
`;

const SortButtonWrapper = styled.div``;
const SortButton = styled.button``;
