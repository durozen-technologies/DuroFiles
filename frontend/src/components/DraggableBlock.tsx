import React, { useState, useEffect } from 'react';
import type { InvoiceData } from '../types/invoice';
import { useEditor } from '../contexts/EditorContext';

interface Props {
  id: string;
  data: InvoiceData;
  onChange?: (data: InvoiceData) => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const DraggableBlock: React.FC<Props> = ({ id, data, onChange, style, children }) => {
  const { isDragMode } = useEditor();
  const canDrag = !!(onChange && isDragMode);

  // Group Mapping for Visibility Toggles
  const getBlockGroup = (blockId: string) => {
    const lower = blockId.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (lower.includes('logo')) return 'logo';
    if (lower.includes('billto') || lower.includes('billedto')) return 'billTo';
    if (lower.includes('shipto') || lower.includes('shipping')) return 'shipTo';
    if (lower.includes('item') || lower.includes('table')) return 'items';
    if (lower.includes('total')) return 'totals';
    if (lower.includes('note')) return 'notes';
    if (lower.includes('term')) return 'terms';
    if (lower.includes('sign') || lower.includes('stamp') || lower.includes('footer3') || lower.includes('footer_3')) return 'signature';

    if (lower.includes('billedby') || lower.includes('header')) return 'billedBy';
    return blockId;
  };

  const isHidden = data.hiddenFields?.includes(getBlockGroup(id));

  // Translate offset starts at 0, 0
  const position = data.layoutPositions?.[id] || { x: 0, y: 0 };
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only draggable if we are in the editor (onChange provided) and drag mode is enabled
    if (!canDrag) return; 
    setIsDragging(true);
    // Calculate the initial mouse offset relative to the current transform
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    e.stopPropagation();
  };

  useEffect(() => {
    if (!isDragging || !canDrag) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      if (onChange) {
        onChange({
          ...data,
          layoutPositions: {
            ...(data.layoutPositions || {}),
            [id]: { x: newX, y: newY }
          }
        });
      }
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
  }, [isDragging, dragStart, data, id, canDrag, onChange]);

  if (isHidden) return null;

  return (
    <div
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: canDrag ? (isDragging ? 'grabbing' : 'grab') : 'default',
        border: canDrag ? '1px dashed transparent' : 'none',
        padding: '10px',
        margin: '-10px', // Compensate for padding to not break layout
        position: 'relative', // Relative to normal document flow
        userSelect: canDrag ? 'none' : 'auto',
        transition: isDragging ? 'none' : 'border 0.2s, background 0.2s',
        zIndex: isDragging ? 10 : 1,
        ...style
      }}
      className={`draggable-block ${canDrag ? 'editable' : ''}`}
      onMouseDown={handleMouseDown}
    >
      <div style={{ pointerEvents: canDrag ? 'none' : 'auto' }}>
        {children}
      </div>
    </div>
  );
};
