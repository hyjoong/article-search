import Bookmark from "pages/bookmark";
import EditArticle from "pages/editArticle";
import Main from "pages/main";
import SignIn from "pages/signIn";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyle from "styles/GlobalStyle";

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/signin" component={SignIn} />
        <Route path="/bookmark" component={Bookmark} />
        <Route path="/edit" component={EditArticle} />
      </Switch>
    </Router>
  );
};

export default Routes;
