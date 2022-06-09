import React from 'react';
import './App.css';
import { store } from './MobX/Store';
import ScatterPlot from './components/plot';

function App() {
  return (
    <ScatterPlot store={store} />
  );
}

export default App;
