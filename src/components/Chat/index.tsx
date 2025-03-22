import React, { useState, useEffect } from 'react';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { ChatTabs } from './ChatTabs';
import { ProviderSelector } from './ProviderSelector';
import { LoadingMessage } from './LoadingMessage';
import { SuperCodeModal } from './SuperCodeModal';
import { ExportButtons } from '../export/ExportButtons';
import { Message, CloudProvider, Tab } from '../../types/chat';
import { generateArchitectureDescription, generateArchitectureDiagram, estimateCosts, generateTerraformCode } from '../../lib/ai';
import { exportToPPT, exportToPDF } from '../../utils/export';
import { config } from '../../lib/config';

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab['id']>('description');
  const [selectedProvider, setSelectedProvider] = useState<CloudProvider>('AWS');
  const [copiedCode, setCopiedCode] = useState(false);
  const [superCode, setSuperCode] = useState('');
  const [showSuperCodeModal, setShowSuperCodeModal] = useState(false);
  const [promptsRemaining, setPromptsRemaining] = useState(config.initialFreePrompts);
  const [hasUsedFreePrompt, setHasUsedFreePrompt] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    description: false,
    architecture: false,
    costs: false,
    terraform: false
  });
  const [contentAvailable, setContentAvailable] = useState({
    description: false,
    architecture: false,
    costs: false,
    terraform: false
  });

  useEffect(() => {
    if (promptsRemaining <= 0 && !showSuperCodeModal && hasUsedFreePrompt) {
      setShowSuperCodeModal(true);
    }
  }, [promptsRemaining, hasUsedFreePrompt]);

  const validateSuperCode = (code: string) => {
    return code === config.superCode;
  };

  const handleSuperCodeSubmit = () => {
    if (validateSuperCode(superCode)) {
      setPromptsRemaining(config.promptsPerCode);
      setShowSuperCodeModal(false);
      setSuperCode('');
    } else {
      alert('Invalid super code. Please try again.');
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setInput('');
    setContentAvailable({
      description: false,
      architecture: false,
      costs: false,
      terraform: false
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const updateMessage = (content: Partial<Message['content']>, type: Tab['id']) => {
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage && lastMessage.role === 'assistant') {
        return [
          ...prev.slice(0, -1),
          {
            ...lastMessage,
            content: { ...lastMessage.content, ...content }
          }
        ];
      }
      return prev;
    });
    setLoadingStates(prev => ({ ...prev, [type]: false }));
    setContentAvailable(prev => ({ ...prev, [type]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (promptsRemaining <= 0) {
      setShowSuperCodeModal(true);
      return;
    }

    // Reset states
    setMessages([]);
    setContentAvailable({
      description: false,
      architecture: false,
      costs: false,
      terraform: false
    });
    
    const userMessage = { 
      role: 'user' as const, 
      content: { description: input }, 
      provider: selectedProvider 
    };
    setMessages([userMessage, { role: 'assistant', content: {}, provider: selectedProvider }]);
    setInput('');
    setLoading(true);
    setLoadingStates({
      description: true,
      architecture: true,
      costs: true,
      terraform: true
    });

    try {
      // Description
      const description = await generateArchitectureDescription(input, selectedProvider);
      updateMessage({ description }, 'description');
      
      // Architecture Diagram (depends on description)
      const diagram = await generateArchitectureDiagram(description, selectedProvider);
      updateMessage({ diagram }, 'architecture');

      // Cost Estimation (independent)
      const costs = await estimateCosts(description, selectedProvider);
      updateMessage({ costs }, 'costs');

      // Terraform Code (independent)
      const terraform = await generateTerraformCode(description, selectedProvider);
      updateMessage({ terraform }, 'terraform');

      setPromptsRemaining(prev => prev - 1);
      if (!hasUsedFreePrompt) {
        setHasUsedFreePrompt(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev.slice(0, -1), { 
        role: 'assistant',
        content: { description: 'Sorry, there was an error processing your request.' },
        provider: selectedProvider
      }]);
    } finally {
      setLoading(false);
    }
  };

  const getPromptStatusMessage = () => {
    if (promptsRemaining > 0) {
      if (!hasUsedFreePrompt) {
        return (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Free Trial
            </span>
            <span className="text-gray-600 text-sm">
              {promptsRemaining} free prompt available
            </span>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Super Code Active
          </span>
          <span className="text-gray-600 text-sm">
            {promptsRemaining} prompt{promptsRemaining !== 1 ? 's' : ''} remaining
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          No Prompts Left
        </span>
        <span className="text-gray-600 text-sm">
          Enter super code to get {config.promptsPerCode} more prompts
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-8rem)] bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-blue-100 transition-all duration-300 hover:shadow-2xl hover:border-blue-200">
        <div className="border-b border-blue-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3">
            <ChatTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              loadingStates={loadingStates}
              contentAvailable={contentAvailable}
            />
            <ProviderSelector selectedProvider={selectedProvider} onProviderChange={setSelectedProvider} />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-3 sm:p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              activeTab={activeTab}
              copiedCode={copiedCode}
              onCopyCode={copyToClipboard}
            />
          ))}
          {loading && loadingStates[activeTab] && (
            <LoadingMessage selectedProvider={selectedProvider} type={activeTab} />
          )}
        </div>

        <div className="border-t border-blue-100 p-3 bg-white/50 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-2 order-2 sm:order-1">
              <ExportButtons
                onClear={clearMessages}
                onExportPPT={() => exportToPPT(messages, selectedProvider)}
                onExportPDF={() => exportToPDF(messages, selectedProvider)}
              />
            </div>
            <div className="flex-1 order-1 sm:order-2">
              <ChatInput
                input={input}
                setInput={setInput}
                loading={loading}
                handleSubmit={handleSubmit}
                promptsRemaining={promptsRemaining}
              />
              <div className="mt-2">
                {getPromptStatusMessage()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuperCodeModal
        isOpen={showSuperCodeModal}
        onClose={() => setShowSuperCodeModal(false)}
        superCode={superCode}
        setSuperCode={setSuperCode}
        onSubmit={handleSuperCodeSubmit}
        remainingPrompts={config.promptsPerCode}
      />
    </>
  );
}