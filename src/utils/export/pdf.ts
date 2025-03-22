import { jsPDF } from 'jspdf';
import { Message } from '../../types/chat';
import { toPng } from 'html-to-image';

export const exportToPDF = async (messages: Message[], selectedProvider: string) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // PDF styling
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);
  let yOffset = margin;
  const lineHeight = 7;

  // Add header to each page
  const addHeader = (title: string) => {
    // Add gradient header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    // Add title and provider
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, 25);
    doc.setFontSize(16);
    doc.text(`${selectedProvider} Cloud Architecture`, margin, 35);
    
    yOffset = 50;
  };

  const assistantMessage = messages.find(msg => msg.role === 'assistant');
  if (assistantMessage) {
    // Page 1: Architecture Overview with Key Components
    addHeader('Architecture Overview');
    if (assistantMessage.content.description) {
      const sections = assistantMessage.content.description.split('\n');
      let overview = '';
      let keyComponents = '';
      let inOverview = false;
      let inKeyComponents = false;

      sections.forEach(section => {
        if (section.startsWith('# Architecture Overview')) {
          inOverview = true;
          inKeyComponents = false;
        } else if (section.startsWith('# Key Components')) {
          inOverview = false;
          inKeyComponents = true;
        } else if (section.startsWith('#')) {
          inOverview = false;
          inKeyComponents = false;
        } else if (inOverview && section.trim()) {
          overview += section + '\n';
        } else if (inKeyComponents && section.trim()) {
          keyComponents += '• ' + section.trim() + '\n';
        }
      });

      // Add overview
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(31, 41, 55);
      const overviewLines = doc.splitTextToSize(overview.trim(), contentWidth);
      doc.text(overviewLines, margin, yOffset);
      yOffset += overviewLines.length * lineHeight + 10;

      // Add key components
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Key Components:', margin, yOffset);
      yOffset += lineHeight + 5;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const componentLines = keyComponents.split('\n').filter(Boolean);
      componentLines.forEach(component => {
        const lines = doc.splitTextToSize(component, contentWidth - 5);
        doc.text(lines, margin, yOffset);
        yOffset += lines.length * lineHeight;
      });
    }

    // Page 2: Architecture Diagram
    doc.addPage();
    addHeader('Architecture Diagram');

    // Get the diagram element and convert it to PNG
    const diagramElement = document.querySelector('.react-flow') as HTMLElement;
    if (diagramElement) {
      try {
        const dataUrl = await toPng(diagramElement, {
          backgroundColor: '#ffffff',
          quality: 1,
          pixelRatio: 2,
        });

        // Add the diagram image to the PDF
        const imgWidth = contentWidth;
        const imgHeight = (contentWidth * 9) / 16; // Maintain 16:9 aspect ratio
        doc.addImage(dataUrl, 'PNG', margin, yOffset, imgWidth, imgHeight);
        yOffset += imgHeight + 20;
      } catch (error) {
        console.error('Error generating diagram image:', error);
      }
    }

    // Page 3: Cost Estimation
    doc.addPage();
    addHeader('Cost Estimation');
    if (assistantMessage.content.costs) {
      const sections = assistantMessage.content.costs.split('\n');
      let costHeaders: string[] = [];
      let costRows: string[][] = [];
      let inCostBreakdown = false;

      sections.forEach(section => {
        if (section.includes('# Detailed Cost Breakdown')) {
          inCostBreakdown = true;
        } else if (section.startsWith('#')) {
          inCostBreakdown = false;
        } else if (inCostBreakdown && section.includes('|')) {
          const cells = section.split('|')
            .map(cell => cell.trim())
            .filter(cell => cell.length > 0);
          
          if (cells.length > 0) {
            if (costHeaders.length === 0) {
              costHeaders = cells;
            } else {
              costRows.push(cells);
            }
          }
        }
      });

      if (costHeaders.length > 0) {
        // Calculate column widths
        const colWidths = costHeaders.map(() => contentWidth / costHeaders.length);
        const cellHeight = 10;
        
        // Draw header
        doc.setFillColor(5, 150, 105);
        doc.rect(margin, yOffset, contentWidth, cellHeight, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);

        let xPos = margin;
        costHeaders.forEach((header, i) => {
          doc.text(header, xPos + 2, yOffset + 7);
          xPos += colWidths[i];
        });
        yOffset += cellHeight;

        // Draw rows
        doc.setTextColor(31, 41, 55);
        doc.setFont('helvetica', 'normal');
        costRows.forEach((row, rowIndex) => {
          // Row background
          doc.setFillColor(rowIndex % 2 === 0 ? 255 : 240, rowIndex % 2 === 0 ? 255 : 253, rowIndex % 2 === 0 ? 255 : 244);
          doc.rect(margin, yOffset, contentWidth, cellHeight, 'F');

          // Row content
          xPos = margin;
          row.forEach((cell, i) => {
            doc.text(cell, xPos + 2, yOffset + 7);
            xPos += colWidths[i];
          });
          yOffset += cellHeight;
        });
      }
    }
  }

  doc.save(`${selectedProvider.toLowerCase()}-architecture.pdf`);
};