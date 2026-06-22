import React from 'react';
import type { InvoiceData } from '../types/invoice';
import { TemplateModern } from './templates/TemplateModern';
import { TemplateClassic } from './templates/TemplateClassic';
import { TemplateCreative } from './templates/TemplateCreative';
import { TemplateTech } from './templates/TemplateTech';
import { TemplateGSTStandard } from './templates/TemplateGSTStandard';

interface Props {
  data: InvoiceData;
  onChange?: (data: InvoiceData) => void;
}

export const InvoicePreview: React.FC<Props> = ({ data, onChange }) => {
  const renderTemplate = () => {
    switch (data.templateId) {
      case 'classic':
        return <TemplateClassic data={data} onChange={onChange} />;
      case 'creative':
        return <TemplateCreative data={data} onChange={onChange} />;
      case 'tech':
        return <TemplateTech data={data} onChange={onChange} />;
      case 'gst_standard':
        return <TemplateGSTStandard data={data} onChange={onChange} />;
      case 'modern':
      default:
        return <TemplateModern data={data} onChange={onChange} />;
    }
  };

  return renderTemplate();
};
