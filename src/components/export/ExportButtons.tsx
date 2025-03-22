import React from 'react';
import { Download, FileText, Trash2 } from 'lucide-react';

interface ExportButtonsProps {
  onClear: () => void;
  onExportPPT: () => void;
  onExportPDF: () => void;
}

export function ExportButtons({ onClear, onExportPPT, onExportPDF }: ExportButtonsProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onClear}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        title="Clear messages"
      >
        <Trash2 size={20} />
        <span className="text-sm font-medium">Clear</span>
      </button>
      <button
        onClick={onExportPPT}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        title="Export to PowerPoint"
      >
        <Download size={20} />
        <span className="text-sm font-medium">PPT</span>
      </button>
      <button
        onClick={onExportPDF}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        title="Export to PDF"
      >
        <FileText size={20} />
        <span className="text-sm font-medium">PDF</span>
      </button>
    </div>
  );
}