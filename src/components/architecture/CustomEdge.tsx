import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={{
          ...style,
          strokeWidth: 2,
          animation: 'flowAnimation 30s linear infinite',
        }}
        className="react-flow__edge-path stroke-2 stroke-blue-200 hover:stroke-blue-400 transition-colors"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {data?.label && (
        <text>
          <textPath
            href={`#${id}`}
            style={{ fontSize: '12px' }}
            startOffset="50%"
            textAnchor="middle"
            className="fill-gray-500 hover:fill-blue-500 transition-colors"
          >
            {data.label}
          </textPath>
        </text>
      )}
      <style>
        {`
          @keyframes flowAnimation {
            from {
              stroke-dasharray: 10;
              stroke-dashoffset: 0;
            }
            to {
              stroke-dasharray: 10;
              stroke-dashoffset: -20;
            }
          }
        `}
      </style>
    </>
  );
}