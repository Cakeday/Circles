import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ProtectedRoute } from './ProtectedRoute'

import Welcome from '../features/Welcome/component'
import Main from '../features/Main/component'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Welcome} />
        <ProtectedRoute path='/main' component={Main}/>
      </Switch>
    </Router>
  );
}

export default App;
