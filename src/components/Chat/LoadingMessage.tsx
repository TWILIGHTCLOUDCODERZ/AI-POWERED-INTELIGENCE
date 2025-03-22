import React from 'react';
import { Cloud, Loader2, Code2, DollarSign, Database, Cpu } from 'lucide-react';

interface LoadingMessageProps {
  selectedProvider: string;
  type: 'description' | 'architecture' | 'costs' | 'terraform';
}

export function LoadingMessage({ selectedProvider, type }: LoadingMessageProps) {
  const getLoadingConfig = () => {
    switch (type) {
      case 'description':
        return {
          icon: <Database className="w-8 h-8 text-white" />,
          title: 'Analyzing Architecture Requirements',
          description: 'Our AI is analyzing your requirements and generating a detailed architecture description.',
          color: 'from-blue-500 to-blue-600',
          steps: [
            'Analyzing requirements',
            'Identifying key components',
            'Evaluating design patterns',
            'Generating documentation'
          ]
        };
      case 'architecture':
        return {
          icon: <Cpu className="w-8 h-8 text-white" />,
          title: 'Designing System Architecture',
          description: 'Creating a comprehensive architecture diagram with component relationships.',
          color: 'from-purple-500 to-purple-600',
          steps: [
            'Mapping components',
            'Establishing connections',
            'Optimizing layout',
            'Finalizing diagram'
          ]
        };
      case 'costs':
        return {
          icon: <DollarSign className="w-8 h-8 text-white" />,
          title: 'Calculating Cost Estimates',
          description: 'Computing detailed cost breakdowns and optimization recommendations.',
          color: 'from-green-500 to-green-600',
          steps: [
            'Gathering pricing data',
            'Computing usage costs',
            'Analyzing alternatives',
            'Preparing estimates'
          ]
        };
      case 'terraform':
        return {
          icon: <Code2 className="w-8 h-8 text-white" />,
          title: 'Generating Infrastructure Code',
          description: 'Creating production-ready Terraform configuration files.',
          color: 'from-orange-500 to-orange-600',
          steps: [
            'Analyzing requirements',
            'Generating resources',
            'Configuring variables',
            'Adding outputs'
          ]
        };
    }
  };

  const config = getLoadingConfig();

  return (
    <div className="flex justify-center w-full min-h-[400px] items-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl animate-fade-in w-full max-w-lg">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Animated Icon */}
          <div className={`p-4 rounded-xl bg-gradient-to-br ${config.color} shadow-xl animate-pulse relative group`}>
            {config.icon}
            <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>

          <div className="space-y-4 w-full">
            {/* Provider Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
              <Cloud size={16} className="mr-1.5" />
              {selectedProvider}
            </div>

            {/* Loading Text */}
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-xl font-semibold text-gray-800">{config.title}</h3>
              <p className="text-gray-600">{config.description}</p>
            </div>

            {/* Steps Progress */}
            <div className="space-y-3">
              {config.steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    index === 1 ? config.color : 'bg-gray-100'
                  }`}>
                    {index === 1 ? (
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : (
                      <span className={`text-xs font-medium ${
                        index === 0 ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {index === 0 ? '✓' : (index + 1)}
                      </span>
                    )}
                  </div>
                  <span className={`text-sm ${
                    index === 1 ? 'text-gray-900 font-medium' : 
                    index === 0 ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-6">
              <div 
                className={`h-full bg-gradient-to-r ${config.color} animate-[loading_2s_ease-in-out_infinite]`}
                style={{ width: '60%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}