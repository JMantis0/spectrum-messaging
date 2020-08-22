import React from 'react';
import { Layout, Navigation, Drawer, Content } from 'react-mdl';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Nav() {
    return (
      <div className="sideNav">
         <Router>
          <Layout>
          <Drawer title="Caroline Lee">
              <Navigation>
                  <Link to="/main">Home</Link>
                  <Link to="/converTwo">(Example Name)</Link>
                  <Link to="/converThree">(Example Name)</Link>             
              </Navigation>
          </Drawer>
          {/* <Content>
              <div className="page-content" />
              <Main></Main>
          </Content> */}
          </Layout>
          <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/converTwo">
            <ConverTwo />
          </Route>
          <Route path="/converThree">
            <ConverThree />
          </Route>
        </Switch>
      </Router>
    </div>
    )};

export default Nav;