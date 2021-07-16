import React from "react";
import styled from "styled-components";
import { Article } from "store/types";
import { useDispatch, useSelector } from "react-redux";
import { addToBookmark, deleteFromBookmark, loadArticle } from "actions";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RootState } from "reducers";

interface ArticleListProps extends RouteComponentProps {
  articles: Article[];
  bookmark?: boolean;
}

interface BtnStyle {
  add?: boolean;
}

const ArticleList: React.FC<ArticleListProps> = (props) => {
  const { articles, bookmark } = props;
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.AccountReducer
  );

  const clickAddBtn = (e: React.MouseEvent<HTMLElement>, article: Article) => {
    console.log(article);
    e.stopPropagation();
    if (isLoggedIn) {
      dispatch(addToBookmark(article));
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };
  return (
    <ArticleListWrapper>
      {/* <SortButtonWrapper>
        <SortButton onClick={() => dispatch(sortArticleList(0))}>
          날짜
        </SortButton>
        <SortButton onClick={() => dispatch(sortArticleList(1))}>
          출처
        </SortButton>
      </SortButtonWrapper> */}
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
          {bookmark ? (
            <Buttons>
              <TextButton
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(loadArticle(article));
                  props.history.push("/edit");
                }}
              >
                수정
              </TextButton>
              <TextButton
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteFromBookmark(article));
                }}
              >
                삭제
              </TextButton>
            </Buttons>
          ) : (
            <TextButton add onClick={(e) => clickAddBtn(e, article)}>
              즐겨찾기 추가
            </TextButton>
          )}
        </ArticleContainer>
      ))}
    </ArticleListWrapper>
  );
};
export default withRouter(ArticleList);

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

// const SortButtonWrapper = styled.div`
//   margin-left: 30px;
// `;
// const SortButton = styled.button`
//   width: 60px;
//   height: 40px;
//   margin: 10px;
//   border-radius: 10px;
// `;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const TextButton = styled.button<BtnStyle>`
  height: 25px;
  padding: 0 10px;
  background: none;
  color: #727272;
  font-size: 18px;
  ${(props) =>
    props.add &&
    `
   display: block;
   margin: 0 0 0 auto;
  `}
  &:hover {
    color: #ea5600;
  }
`;
