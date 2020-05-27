import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Welcome from '../features/Welcome/component'
import ProtectedRoute from './ProtectedRoute'


function App() {
  return (
    <Router>
      <Route exact path='/' component={Welcome} />
    </Router>
  );
}

export default App;
