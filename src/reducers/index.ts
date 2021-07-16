import { combineReducers } from "redux";
import ArticleReducer from "./article";
import storage from "redux-persist/lib/storage";
import { ArticleState, AccountState, BookmarkState } from "store/types";
import BookmarkReducer from "./bookmark";
import AccountReducer from "./account";
import { persistReducer } from "redux-persist";

export interface RootState {
  ArticleReducer: ArticleState;
  AccountReducer: AccountState;
  BookmarkReducer: BookmarkState;
}
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["ArticleReducer"],
};

const rootReducer = combineReducers<RootState>({
  ArticleReducer,
  AccountReducer,
  BookmarkReducer,
});

export default persistReducer(persistConfig, rootReducer);
