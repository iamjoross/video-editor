import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';
import {
  UPDATE_CURRENT_DROPPED_ITEM,
  UPDATE_CURRENT_HOVERING_ITEM,
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
const initState = {
  layers,
  media,
  frames,
  currentDroppedItem,
};

const store = createContext(initState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case UPDATE_CURRENT_DROPPED_ITEM:
        if (action.payload.item.type === 'video') {
          return update(state, {
            layers: { 0: { frames: { $push: [action.payload] } } },
          });
        } else if (action.payload.item.type === 'audio') {
          return update(state, {
            layers: { 1: { frames: { $push: [action.payload] } } },
          });
        } else {
          return update(state, {
            layers: { 2: { frames: { $push: [action.payload] } } },
          });
        }

        return state;
      default:
        throw new Error();
    }
  }, initState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
