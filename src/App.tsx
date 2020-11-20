import React from 'react';
import './App.scss';
import SoundscapeList from './components/SoundscapeList/SoundscapeList';
import AppHeader from './widgets/AppHeader';

function App() {

  return (
    <div className="App">
      <AppHeader />
      <SoundscapeList />
    </div>
  );
}

export default App;
