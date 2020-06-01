import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';
// import s from './TimelineRuler.scss';

const TimelineRuler = (props) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(41);
  const [scrollPos, setScrollPos] = useState(0);
  const [canvas, setCanvas] = useState({});
  const [didMount, setDidMount] = useState(false);

  const divRef = useRef(null);
  const canvasRef = useRef(null);

  // drawlines
  const draw = useCallback(() => {
    const {
      unit,
      zoom,
      backgroundColor,
      lineColor,
      textColor,
      direction,
      textFormat,
    } = props;

    const context = canvasRef.current.getContext('2d');
    const isDirectionStart = direction === 'start';
    context.rect(0, 0, width * 2, height * 2);
    context.fillStyle = backgroundColor;
    context.fill();
    context.save();
    context.scale(2, 2);
    context.strokeStyle = lineColor;
    context.lineWidth = 1;
    context.font = '8px';
    context.fillStyle = textColor;

    if (isDirectionStart) {
      context.textBaseline = 'top';
    }
    context.translate(0.5, 0);
    context.beginPath();

    const size = width;
    const zoomUnit = zoom * unit;
    const minRange = Math.floor((scrollPos * zoom) / zoomUnit);
    const maxRange = Math.ceil((scrollPos * zoom + size) / zoomUnit);
    const length = maxRange - minRange;

    for (let i = 0; i < length; ++i) {
      const startPos = ((i + minRange) * unit - scrollPos) * zoom;

      if (startPos >= -zoomUnit && startPos < size) {
        const [startX, startY] = [
          startPos - 8,
          //startPos + 3,
          isDirectionStart ? 17 : height - 17,
        ];

        let text = `${(i + minRange) * unit}s`;

        if (textFormat) {
          text = textFormat((i + minRange) * unit);
        }
        if (i === 0) continue;
        context.fillText(text, startX, startY);
      }

      // line marks
      for (let j = 0; j < 10; ++j) {
        const pos = startPos + (j / 10) * zoomUnit;

        if (pos < 0 || pos >= size) {
          continue;
        }

        const lineSize = j === 0 ? 5 : j % 2 === 0 ? 0 : 0;
        // const lineSize = j === 0 ? height : j % 2 === 0 ? 10 : 7;

        const [x1, y1] = [pos, isDirectionStart ? 0 : 0];
        // const [x1, y1] = [pos, isDirectionStart ? 0 : height - lineSize];
        const [x2, y2] = [x1, y1 + lineSize];
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
      }
    }

    context.stroke();
    context.restore();
  }, [height, props, scrollPos, width]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const { widthCustom, heightCustom } = props;

    if (!didMount) {
      setWidth(widthCustom || canvas.offsetWidth);
      // setHeight(heightCustom || canvas.offsetHeight);
      setDidMount(true);
    }

    canvas.width = width * 2;
    canvas.height = height * 1.8;

    draw();
  }, [didMount, draw, height, props, width]);

  useLayoutEffect(() => {
    resize();
  }, [resize]);

  return (
    <div ref={divRef} className='timeline__container-header__ruler'>
      <canvas ref={canvasRef} />
    </div>
  );
};

TimelineRuler.defaultProps = {
  zoom: 1,
  width: 0,
  height: 0,
  unit: 50,
  direction: 'end',
  style: { width: '100%', height: '100%' },
  backgroundColor: 'rgb(242,245,248)',
  textColor: 'rgb(151,159, 165)',
  lineColor: 'rgb(181,189, 197)',
};
export default TimelineRuler;
