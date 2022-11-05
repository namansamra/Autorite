import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './navigation';
if (import.meta.env.PROD) {
  console.log = () => {};
}
function App() {
  return (
    <Router>
      <React.Suspense fallback={<div>Error!! Please refresh...</div>}>
        <Navigation />
      </React.Suspense>
    </Router>
  );
}

export default App;
