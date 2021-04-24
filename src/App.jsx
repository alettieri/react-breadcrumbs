import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import React from "react";

const PageOne = () => {
  return <h1>Page One</h1>;
};

const PageTwo = () => {
  return <h1>Page Two</h1>;
};


export default function App() {
  return (
    <main className="App">
      <Router>
        <div>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/page2">Goodbye</Link>
        </div>
        <Switch>
          <Route path="/" exact>
            <PageOne />
          </Route>
          <Route path="/page2">
            <PageTwo />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}
