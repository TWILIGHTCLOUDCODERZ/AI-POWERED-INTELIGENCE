import React from 'react';
import { Cloud, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../types/chat';
import { DataTable } from '../DataTable';
import { ArchitecturePanel } from '../architecture/ArchitecturePanel';

interface ChatMessageProps {
  message: Message;
  activeTab: 'description' | 'architecture' | 'costs' | 'terraform';
  copiedCode: boolean;
  onCopyCode: (text: string) => void;
}

export function ChatMessage({ message, activeTab, copiedCode, onCopyCode }: ChatMessageProps) {
  const extractTableData = (content: string) => {
    const lines = content.split('\n');
    const tableData = {
      headers: [] as string[],
      rows: [] as string[][],
    };

    let isInTable = false;

    for (const line of lines) {
      if (line.includes('|')) {
        const cells = line
          .split('|')
          .map(cell => cell.trim())
          .filter(cell => cell.length > 0);

        if (cells.length > 0) {
          if (!isInTable) {
            tableData.headers = cells;
            isInTable = true;
          } else if (!line.includes('---')) {
            tableData.rows.push(cells);
          }
        }
      } else {
        isInTable = false;
      }
    }

    return tableData;
  };

  const renderMessageContent = () => {
    if (message.role === 'user') {
      return message.content.description;
    }

    if (activeTab === 'architecture' && message.role === 'assistant') {
      return (
        <ArchitecturePanel 
          description={message.content.description || ''} 
          provider={message.provider || 'AWS'} 
        />
      );
    }

    const content = (() => {
      switch (activeTab) {
        case 'description':
          return message.content.description;
        case 'costs':
          return message.content.costs;
        case 'terraform':
          return message.content.terraform;
        default:
          return null;
      }
    })();

    if (!content) return null;

    // Extract tables from the content
    const sections = content.split(/(?=# )/);
    return sections.map((section, index) => {
      if (section.includes('|')) {
        const tableData = extractTableData(section);
        if (tableData.headers.length > 0 && tableData.rows.length > 0) {
          const title = section.split('\n')[0].replace('#', '').trim();
          return (
            <div key={index} className="my-6">
              {title && (
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
              )}
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <DataTable headers={tableData.headers} rows={tableData.rows} />
              </div>
            </div>
          );
        }
      }

      return (
        <ReactMarkdown
          key={index}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold text-gray-900 mb-4 mt-6 pb-2 border-b border-gray-200">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-5">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-medium text-gray-600 mb-2 mt-4">
                {children}
              </h3>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-2 my-4 ml-4 text-gray-600">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-2 my-4 ml-4 text-gray-600">
                {children}
              </ol>
            ),
            p: ({ children }) => (
              <p className="text-gray-600 mb-4">
                {children}
              </p>
            ),
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              return !inline ? (
                <div className="relative group">
                  <div className="rounded-lg bg-gray-50 p-4 overflow-x-auto border border-gray-200">
                    <code className="text-sm font-mono text-gray-900" {...props}>
                      {children}
                    </code>
                  </div>
                  <button
                    onClick={() => onCopyCode(String(children))}
                    className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200 opacity-0 group-hover:opacity-100"
                    title="Copy code"
                  >
                    <Copy size={16} className={copiedCode ? 'text-green-500' : 'text-gray-500'} />
                  </button>
                </div>
              ) : (
                <code className="px-1.5 py-0.5 rounded-md bg-gray-50 text-blue-600 font-mono text-sm">
                  {children}
                </code>
              );
            },
            a: ({ children, href }) => (
              <a href={href} className="text-blue-600 hover:text-blue-700 underline">
                {children}
              </a>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900">
                {children}
              </strong>
            ),
          }}
          className={`prose prose-sm max-w-none ${
            message.role === 'user' ? 'prose-invert' : 'prose-blue'
          }`}
        >
          {section}
        </ReactMarkdown>
      );
    });
  };

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} px-2 sm:px-4`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 sm:p-6 ${
          message.role === 'user'
            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
            : 'bg-white text-gray-900 border border-gray-200 shadow-md'
        }`}
      >
        {message.provider && (
          <div className="flex items-center gap-2 mb-3 text-sm font-medium">
            <Cloud size={16} className={message.role === 'user' ? 'text-white/80' : 'text-blue-500'} />
            <span className={message.role === 'user' ? 'text-white/90' : 'text-gray-600'}>
              {message.provider}
            </span>
          </div>
        )}
        <div className="relative">
          {renderMessageContent()}
          {activeTab === 'terraform' && message.role === 'assistant' && (
            <button
              onClick={() => onCopyCode(message.content.terraform || '')}
              className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200"
              title="Copy Terraform code"
            >
              <Copy size={16} className={copiedCode ? 'text-green-500' : 'text-gray-500'} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}