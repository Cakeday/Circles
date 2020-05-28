import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { ProtectedRoute } from './ProtectedRoute'

import Welcome from '../features/Welcome/component'
import Main from '../features/Main/component'


function App() {
  return (
    <Router>
      <Route exact path='/' component={Welcome} />
      <ProtectedRoute path='/main' component={Main}/>
    </Router>
  );
}

export default App;
