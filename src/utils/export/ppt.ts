import pptxgen from 'pptxgenjs';
import { Message } from '../../types/chat';
import { toPng } from 'html-to-image';

export const exportToPPT = async (messages: Message[], selectedProvider: string) => {
  const pres = new pptxgen();
  
  // Set presentation layout
  pres.layout = 'LAYOUT_16x9';
  pres.defineLayout({ name: 'CUSTOM', width: 13.33, height: 7.5 });
  pres.layout = 'CUSTOM';

  // Helper function to add slide header
  const addSlideHeader = (slide: any, title: string, icon: string) => {
    // Add gradient banner
    slide.addShape(pres.ShapeType.rect, {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.8,
      fill: { 
        type: 'gradient',
        color1: '2563EB',
        color2: '1D4ED8',
        angle: 45
      }
    });

    // Add icon with background
    slide.addShape(pres.ShapeType.ellipse, {
      x: 0.5,
      y: 1,
      w: 0.6,
      h: 0.6,
      fill: { color: 'EFF6FF' }
    });

    slide.addText(icon, {
      x: 0.5,
      y: 1,
      w: 0.6,
      h: 0.6,
      fontSize: 24,
      align: 'center',
      valign: 'middle'
    });

    // Add title
    slide.addText(title, {
      x: 1.3,
      y: 1,
      w: 10,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: '1F2937',
      valign: 'middle'
    });
  };

  const assistantMessage = messages.find(msg => msg.role === 'assistant');
  if (assistantMessage) {
    // Page 1: Architecture Overview with Key Components
    const overviewSlide = pres.addSlide();
    overviewSlide.background = { color: 'F8FAFC' };
    addSlideHeader(overviewSlide, 'Architecture Overview', '📋');

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

      // Add overview text
      overviewSlide.addText(overview.trim(), {
        x: 0.5,
        y: 2,
        w: 12,
        h: 1,
        fontSize: 14,
        color: '1F2937'
      });

      // Add key components in a nice format
      overviewSlide.addShape(pres.ShapeType.roundRect, {
        x: 0.5,
        y: 3.2,
        w: 12,
        h: 3.5,
        fill: { color: 'FFFFFF' },
        line: { color: 'E5E7EB', width: 1 },
        radius: 8
      });

      overviewSlide.addText('Key Components:', {
        x: 1,
        y: 3.4,
        w: 11,
        h: 0.4,
        fontSize: 16,
        bold: true,
        color: '1F2937'
      });

      overviewSlide.addText(keyComponents.split('\n').filter(Boolean), {
        x: 1,
        y: 3.8,
        w: 11,
        h: 2.7,
        fontSize: 14,
        color: '1F2937',
        bullet: true
      });
    }

    // Page 2: Architecture Diagram
    const diagramSlide = pres.addSlide();
    diagramSlide.background = { color: 'F8FAFC' };
    addSlideHeader(diagramSlide, 'Architecture Diagram', '🔄');

    // Get the diagram element and convert it to PNG
    const diagramElement = document.querySelector('.react-flow') as HTMLElement;
    if (diagramElement) {
      try {
        const dataUrl = await toPng(diagramElement, {
          backgroundColor: '#ffffff',
          quality: 1,
          pixelRatio: 2,
        });

        diagramSlide.addImage({
          data: dataUrl,
          x: 0.5,
          y: 2,
          w: 12,
          h: 4.5,
        });
      } catch (error) {
        console.error('Error generating diagram image:', error);
      }
    }

    // Page 3: Cost Estimation
    const costSlide = pres.addSlide();
    costSlide.background = { color: 'F8FAFC' };
    addSlideHeader(costSlide, 'Cost Estimation', '💰');

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
        // Add table container
        costSlide.addShape(pres.ShapeType.roundRect, {
          x: 0.5,
          y: 2,
          w: 12,
          h: 4.5,
          fill: { color: 'FFFFFF' },
          line: { color: 'E5E7EB', width: 1 },
          radius: 8
        });

        // Add table
        costSlide.addTable([costHeaders], {
          x: 0.6,
          y: 2.1,
          w: 11.8,
          colW: Array(costHeaders.length).fill(11.8 / costHeaders.length),
          color: 'FFFFFF',
          fill: { color: '059669' },
          fontSize: 14,
          bold: true,
          border: { type: 'solid', color: 'E5E7EB', pt: 1 },
          align: 'left',
          valign: 'middle'
        });

        if (costRows.length > 0) {
          costSlide.addTable(costRows, {
            x: 0.6,
            y: 2.6,
            w: 11.8,
            colW: Array(costHeaders.length).fill(11.8 / costHeaders.length),
            fontSize: 12,
            border: { type: 'solid', color: 'E5E7EB', pt: 1 },
            align: 'left',
            valign: 'middle',
            rowH: 0.4,
            rows: costRows.map((_, i) => ({
              fill: { color: i % 2 === 0 ? 'FFFFFF' : 'F0FDF4' }
            }))
          });
        }
      }
    }
  }
  
  await pres.writeFile({ fileName: `${selectedProvider.toLowerCase()}-architecture.pptx` });
};