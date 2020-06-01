import { ItemTypes } from '../types';

export const getItemType = (type) => {
  return type === 'video'
    ? ItemTypes.VIDEO
    : type === 'audio'
    ? ItemTypes.AUDIO
    : type === 'text'
    ? ItemTypes.TEXT
    : null;
};
