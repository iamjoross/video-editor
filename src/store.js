import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  UPDATE_CURRENT_DROPPED_ITEM,
  UPDATE_CURRENT_HOVERING_COORD,
} from './constants';
import 'holderjs';

var layers = [
  {
    id: uuidv4(),
    title: 'layer 1',
    type: 'video',
    accept: 'video',
    lastDroppedItem: null,
    // { left: 100, duration: 80 }
    frames: [],
  },
  {
    id: uuidv4(),
    title: 'layer 2',
    type: 'audio',
    accept: 'audio',
    lastDroppedItem: null,
    frames: [],
  },
  {
    id: uuidv4(),
    title: 'layer 3',
    type: 'text',
    accept: 'text',
    lastDroppedItem: null,
    frames: [],
  },
];

const media = {
  'media-1': {
    image: 'holder.js/150x100?theme=sky',
    type: 'video',
  },
  'media-2': {
    image: 'holder.js/150x100?theme=vine',
    type: 'audio',
  },
  'media-3': {
    image: 'holder.js/150x100?theme=lava',
    type: 'text',
  },
  'media-4': {
    image: 'holder.js/150x100?theme=sky',
    type: 'video',
  },
  'media-5': {
    image: 'holder.js/150x100?theme=sky',
    type: 'video',
  },
  'media-6': {
    image: 'holder.js/150x100?theme=lava',
    type: 'text',
  },
};
const frames = {};
// var frames = {
//   '3d1df1b4-4d9d-45a4-bf14-cb580ee74675': [
//     {
//       name: 'Hello.png',
//       second: 0,
//       duration: 70,
//     },
//     {
//       name: 'Welcome.png',
//       second: 130,
//       duration: 200,
//     },
//   ],
//   '7d8c4210-0cfa-4a10-8b21-01e6601e00bf': [
//     {
//       name: 'Goodbye.png',
//       second: 10,
//       duration: 150,
//     },
//   ],
//   '65079f30-47a8-4469-833e-4f0eea04d233': [],
// };

const currentDroppedItem = null;
const currentHoveringItem = null;
const initState = {
  layers,
  media,
  frames,
  currentHoveringItem,
  currentDroppedItem,
};

const store = createContext(initState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case UPDATE_CURRENT_DROPPED_ITEM:
        state = { ...state, currentDroppedItem: action.payload };
        return state;
      case UPDATE_CURRENT_HOVERING_COORD:
        state = { ...state, currentHoveringItem: { coords: action.payload } };
        return state;
      default:
        throw new Error();
    }
  }, initState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
