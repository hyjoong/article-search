import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import ArticleList from "components/articleList";
import Nav from "components/nav";

const Bookmark: React.FC = () => {
  const { bookmarkList } = useSelector(
    (state: RootState) => state.BookmarkReducer
  );
  return (
    <>
      <BookmarkLayout>
        <Nav />
        <ArticleList articles={bookmarkList} bookmark />
      </BookmarkLayout>
    </>
  );
};

export default Bookmark;

const BookmarkLayout = styled.section`
  width: 60%;
  margin: 30px auto 50px; ;
`;
