import React from 'react';

export default function CustomCursor({ cursorTheme, mousePos, isHovering }) {
  if (cursorTheme === 'default') return null;

  return (
    <>
      {/* Dynamic Style to hide default cursor when custom cursor is active */}
      <style>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Hardware Accelerated Custom Mouse Cursors */}
      {cursorTheme === 'developer' && (
        <>
          <div
            className={`cursor-ring hidden md:block ${isHovering ? 'cursor-ring-hover' : ''}`}
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          />
          <div
            className="cursor-dot hidden md:block"
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          />
          <div
            className="cursor-coords hidden md:block"
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          >
            {Math.round(mousePos.x)},{Math.round(mousePos.y)}
          </div>
        </>
      )}

      {cursorTheme === 'aura' && (
        <>
          <div
            className={`cursor-aura hidden md:block ${isHovering ? 'cursor-aura-hover' : ''}`}
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          />
          <div
            className="cursor-aura-dot hidden md:block"
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          />
        </>
      )}

      {cursorTheme === 'crosshair' && (
        <div
          className={`cursor-crosshair hidden md:block ${isHovering ? 'cursor-crosshair-hover' : ''}`}
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        >
          <div className="cursor-crosshair-center" />
        </div>
      )}
    </>
  );
}
