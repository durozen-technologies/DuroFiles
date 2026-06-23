import React from 'react';
import type { InvoiceData } from '../types/invoice';

interface Props {
  id: string;
  defaultText: string;
  data: InvoiceData;
  onChange?: (data: InvoiceData) => void;
  className?: string;
}

export const EditableLabel: React.FC<Props> = ({ id, defaultText, data, onChange, className }) => {
  const text = data.labels?.[id] || defaultText;

  return (
    <span
      contentEditable={!!onChange}
      suppressContentEditableWarning
      onBlur={(e) => {
        if (onChange) {
          onChange({
            ...data,
            labels: {
              ...(data.labels || {}),
              [id]: e.currentTarget.textContent || defaultText
            }
          });
        }
      }}
      onMouseDown={(e) => {
        if (onChange) {
          e.stopPropagation();
        }
      }}
      className={`editable-field ${className || ''}`}
      style={{ 
        cursor: onChange ? 'text' : 'inherit',
        display: 'inline-block',
        minWidth: '20px'
      }}
      title={onChange ? "Click to edit" : undefined}
    >
      {text}
    </span>
  );
};
