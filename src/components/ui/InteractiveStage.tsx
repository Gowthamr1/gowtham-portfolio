import React, { useEffect, useRef } from 'react';

export const InteractiveStage: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia('(pointer: coarse)').matches) return undefined;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const render = () => {
      frame = 0;
      stage.style.setProperty('--cursor-x', `${x}px`);
      stage.style.setProperty('--cursor-y', `${y}px`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    render();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={stageRef} className="interactive-stage" aria-hidden="true">
      <span className="interactive-stage__spotlight" />
      <span className="interactive-stage__cursor" />
      <span className="interactive-stage__cursor-ring" />
    </div>
  );
};
