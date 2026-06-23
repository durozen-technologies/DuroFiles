import React, { useState, useEffect } from 'react';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  placeholder?: string;
  isTextArea?: boolean;
}

export const EditableValue: React.FC<Props> = ({ value, onChange, className, placeholder, isTextArea }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newVal = e.currentTarget.textContent || '';
    if (newVal !== value) {
      onChange(newVal);
    }
  };

  return (
    <span
      contentEditable={true}
      suppressContentEditableWarning
      onBlur={handleBlur}
      onInput={(e) => setLocalValue(e.currentTarget.textContent || '')}
      onMouseDown={(e) => e.stopPropagation()}
      className={`editable-field ${className || ''}`}
      style={{
        cursor: 'text',
        display: isTextArea ? 'block' : 'inline-block',
        minWidth: '20px',
        minHeight: isTextArea ? '1.5em' : 'auto',
        outline: 'none',
        whiteSpace: isTextArea ? 'pre-wrap' : 'normal'
      }}
      title="Click to edit value"
      data-placeholder={placeholder}
    >
      {value || placeholder || ''}
    </span>
  );
};
