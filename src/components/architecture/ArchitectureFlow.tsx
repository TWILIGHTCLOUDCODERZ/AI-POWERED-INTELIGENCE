import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState
} from 'reactflow';
import { Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import 'reactflow/dist/style.css';
import { CustomNode } from './CustomNode';
import { CustomEdge } from './CustomEdge';
import { ArchitectureNode, ArchitectureEdge } from '../../types/chat';

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

interface ArchitectureFlowProps {
  initialNodes: ArchitectureNode[];
  initialEdges: ArchitectureEdge[];
}

export function ArchitectureFlow({ initialNodes, initialEdges }: ArchitectureFlowProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const flowRef = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const downloadAsPNG = useCallback(() => {
    if (flowRef.current === null) return;

    const downloadFileName = 'architecture-diagram.png';

    toPng(flowRef.current, {
      backgroundColor: '#ffffff',
      quality: 1,
      pixelRatio: 2,
      style: {
        border: 'none',
      },
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = downloadFileName;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error generating image:', error);
      });
  }, []);

  return (
    <div className="w-full h-[600px] bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-blue-100/50 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-200/50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 pointer-events-none" />
      
      <button
        onClick={downloadAsPNG}
        className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300 text-gray-700 hover:text-blue-600 group"
      >
        <Download size={18} className="transition-transform group-hover:scale-110" />
        <span className="text-sm font-medium">Download Diagram</span>
      </button>

      <div ref={flowRef} className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          attributionPosition="bottom-right"
          className="transition-all duration-300"
        >
          <Background 
            color="#93c5fd"
            size={1.5}
            gap={20}
            className="opacity-5"
          />
          <Controls className="transition-transform hover:scale-105" />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === 'custom') return '#2563eb';
              return '#000';
            }}
            nodeColor={(n) => {
              if (n.type === 'custom') return '#93c5fd';
              return '#fff';
            }}
            className="transition-transform hover:scale-105"
          />
        </ReactFlow>
      </div>
    </div>
  );
}