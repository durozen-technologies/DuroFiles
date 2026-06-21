import React, { useState, useEffect } from 'react';
import type { InvoiceData } from '../types/invoice';

interface Props {
  id: string;
  data: InvoiceData;
  onChange?: (data: InvoiceData) => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const DraggableBlock: React.FC<Props> = ({ id, data, onChange, style, children }) => {
  // Translate offset starts at 0, 0
  const position = data.layoutPositions?.[id] || { x: 0, y: 0 };
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only draggable if we are in the editor (onChange provided)
    if (!onChange) return; 
    setIsDragging(true);
    // Calculate the initial mouse offset relative to the current transform
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    e.stopPropagation();
  };

  useEffect(() => {
    if (!isDragging || !onChange) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      onChange({
        ...data,
        layoutPositions: {
          ...(data.layoutPositions || {}),
          [id]: { x: newX, y: newY }
        }
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, data, id, onChange]);

  return (
    <div
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: onChange ? (isDragging ? 'grabbing' : 'grab') : 'default',
        border: onChange ? '1px dashed transparent' : 'none',
        padding: '10px',
        margin: '-10px', // Compensate for padding to not break layout
        position: 'relative', // Relative to normal document flow
        userSelect: onChange ? 'none' : 'auto',
        transition: isDragging ? 'none' : 'border 0.2s, background 0.2s',
        zIndex: isDragging ? 10 : 1,
        ...style
      }}
      className={`draggable-block ${onChange ? 'editable' : ''}`}
      onMouseDown={handleMouseDown}
    >
      <div style={{ pointerEvents: onChange ? 'none' : 'auto' }}>
        {children}
      </div>
    </div>
  );
};
