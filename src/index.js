import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { StateProvider } from './store.js';

import App from './App';

ReactDOM.render(
  <React.Suspense fallback={''}>
    <StateProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </StateProvider>
  </React.Suspense>,
  document.getElementById('root')
);
