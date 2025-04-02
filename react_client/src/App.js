import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@material-ui/core';
import EndpointList from './components/EndpointList';
import EndpointQuery from './components/EndpointQuery';
import EndpointDeploy from './components/EndpointDeploy';
import EndpointRemove from './components/EndpointRemove';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            InfoGraphicMCP - TabPy Manager
          </Typography>
          <Button color="inherit" component={Link} to="/">
            List Endpoints
          </Button>
          <Button color="inherit" component={Link} to="/query">
            Query Endpoint
          </Button>
          <Button color="inherit" component={Link} to="/deploy">
            Deploy Endpoint
          </Button>
          <Button color="inherit" component={Link} to="/remove">
            Remove Endpoint
          </Button>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: '2rem' }}>
        <Switch>
          <Route exact path="/" component={EndpointList} />
          <Route path="/query" component={EndpointQuery} />
          <Route path="/deploy" component={EndpointDeploy} />
          <Route path="/remove" component={EndpointRemove} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
