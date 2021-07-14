import {
  Article,
  FetchArticleListAction,
  SortArticleListAction,
  SORT_ARTICLE_LIST,
  FETCH_ARTICLE_LIST,
} from "../store/types";

export const fetchArticleList = (
  articles: Article[]
): FetchArticleListAction => {
  return {
    type: FETCH_ARTICLE_LIST,
    payload: articles,
  };
};

export const sortArticleList = (idx: number): SortArticleListAction => {
  return {
    type: SORT_ARTICLE_LIST,
    payload: idx,
  };
};
