import React from "react";
import styled from "styled-components";

interface PaginationProps {
  totalArticles: number;
  postsPerPage: number;
  currentPage?: number;
  paginate: (pageNum: number) => void;
}

const Pagenation: React.FC<PaginationProps> = (props) => {
  const { totalArticles, postsPerPage, paginate } = props;
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalArticles / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <PagenationWrapper>
      {pageNumber.map((page, idx) => (
        <PagenationPage key={idx} onClick={() => paginate(page)}>
          {page}
        </PagenationPage>
      ))}
    </PagenationWrapper>
  );
};

export default Pagenation;

const PagenationWrapper = styled.ul`
  display: flex;
  justify-content: center;
`;

const PagenationPage = styled.li`
  padding: 1rem;
  cursor: pointer;
`;
