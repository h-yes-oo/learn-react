import React from 'react';
import User from './User';

function App() {
  const user = {
    id: 1,
    username: 'COCO'
  }
  return (
    <User user={user} />
  );
}

export default App;
