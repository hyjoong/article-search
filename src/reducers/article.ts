import {
  ArticleActionTypes,
  FETCH_ARTICLE_LIST,
  SORT_ARTICLE_LIST,
  ArticleState,
} from "../store/types";

const initialState: ArticleState = {
  articles: [],
};

const ArticleReducer = (
  state = initialState,
  action: ArticleActionTypes
): ArticleState => {
  switch (action.type) {
    case FETCH_ARTICLE_LIST:
      return { ...state, articles: action.payload };
    case SORT_ARTICLE_LIST:
      switch (action.payload) {
        case 0:
          const sortedArticlesByDate = state.articles.sort((a, b) => {
            return a.publishedAt < b.publishedAt
              ? -1
              : a.publishedAt > b.publishedAt
              ? 1
              : 0;
          });
          return { ...state, articles: sortedArticlesByDate };
        case 1:
          const sortedArticlesBySource = state.articles.sort((a, b) => {
            return a.source.name < b.source.name
              ? -1
              : a.source.name > b.source.name
              ? 1
              : 0;
          });
          return { ...state, articles: sortedArticlesBySource };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default ArticleReducer;
