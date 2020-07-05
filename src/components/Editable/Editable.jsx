import React, { useEffect, useContext } from 'react';
import {store} from '../../store';
import {TOGGLE_EDITING_TITLE} from '../../constants';
import './Editable.scss';

const Editable = ({
  text,
  type,
  placeholder,
  children,
  childRef,
  ...props
}) => {
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    if (childRef && childRef.current && state.isEditingTitle === true) {
      childRef.current.focus();
    }
  }, [ childRef, state.isEditingTitle]);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ['Escape', 'Tab'];
    const enterKey = 'Enter';
    const allKeys = [...keys, enterKey];

    if (
      (type === 'textarea' && keys.indexOf(key) > -1) ||
      (type !== 'textarea' && allKeys.indexOf(key) > -1)
    ) {
      dispatch({
        type: TOGGLE_EDITING_TITLE,
        payload: false,
      });
    }
  };

  return (
    <section {...props}>
      {state.isEditingTitle ? (
        <div
          onBlur={() => dispatch({
            type: TOGGLE_EDITING_TITLE,
            payload: false,
          })}
          onKeyDown={(e) => handleKeyDown(e, type)}
          onFocus={(e) => e.target.select()}
        >
          {children}
        </div>
      ) : (
        <div
          className={`rounded py-2 px-3 text-gray-700 leading-tight whitespace-pre-wrap hover:shadow-outline editable-${type}`}
          onClick={() => dispatch({
            type: TOGGLE_EDITING_TITLE,
            payload: true,
          })}
        >
          <span className={`${text ? 'text-black' : 'text-gray-500'}`}>
            {text || placeholder || 'Editable content'}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;
