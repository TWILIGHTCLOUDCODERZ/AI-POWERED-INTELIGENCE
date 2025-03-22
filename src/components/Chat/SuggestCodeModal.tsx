import React from 'react';
import { X, Lock, Sparkles } from 'lucide-react';

interface SuperCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  superCode: string;
  setSuperCode: (code: string) => void;
  onSubmit: () => void;
  remainingPrompts: number;
}

export function SuperCodeModal({
  isOpen,
  onClose,
  superCode,
  setSuperCode,
  onSubmit,
  remainingPrompts
}: SuperCodeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Unlock More Prompts</h2>
            <p className="text-sm text-gray-600">Enter the super code to continue</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-blue-800">
            <Lock size={16} />
            <span className="font-medium">Super Code Benefits:</span>
          </div>
          <ul className="mt-2 space-y-1 text-sm text-blue-700">
            <li>• Get {remainingPrompts} additional prompts</li>
            <li>• Unlimited super code usage</li>
            <li>• All features remain accessible</li>
          </ul>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="supercode" className="block text-sm font-medium text-gray-700 mb-1">
              Super Code
            </label>
            <input
              id="supercode"
              type="text"
              value={superCode}
              onChange={(e) => setSuperCode(e.target.value)}
              placeholder="Enter SUPERCODE to get more prompts"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <button
            onClick={onSubmit}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
          >
            Unlock More Prompts
          </button>
        </div>
      </div>
    </div>
  );
}