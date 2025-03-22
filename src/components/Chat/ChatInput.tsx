import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  promptsRemaining: number;
}

export function ChatInput({
  input,
  setInput,
  loading,
  handleSubmit,
  promptsRemaining
}: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your architecture requirements..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          disabled={loading}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 whitespace-nowrap"
        disabled={loading || promptsRemaining <= 0}
      >
        <Send size={20} />
        <span className="font-medium">
          {promptsRemaining <= 0 ? 'Enter Super Code' : 'Generate'}
        </span>
      </button>
    </form>
  );
}