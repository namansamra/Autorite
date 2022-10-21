import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './navigation';
function App() {
  return (
    <Router>
      <React.Suspense fallback={<div>Hello</div>}>
        <Navigation />
      </React.Suspense>
    </Router>
  );
}

export default App;
