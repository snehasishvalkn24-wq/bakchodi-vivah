import React, { useState } from 'react';
import { PRISMA_SCHEMA_STRING, SERVER_ACTIONS_STRING } from '../data/prismaSchemaCode';
import { X, Copy, Check, Database, Server, Code } from 'lucide-react';

interface PrismaArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrismaArchitectureModal: React.FC<PrismaArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'PRISMA' | 'ACTIONS'>('PRISMA');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCode = activeTab === 'PRISMA' ? PRISMA_SCHEMA_STRING : SERVER_ACTIONS_STRING;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-4xl bg-stone-900 text-stone-100 rounded-3xl border border-stone-800 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Database className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                Full-Stack Architecture & Schema Specs
              </h3>
              <p className="text-xs text-stone-400">
                Module 4: Prisma ORM Schema & Next.js 14 Server Actions implementation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-800 bg-stone-950/60 px-4">
          <button
            onClick={() => setActiveTab('PRISMA')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'PRISMA'
                ? 'border-amber-400 text-amber-300 bg-stone-800/40'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>schema.prisma (PostgreSQL ORM)</span>
          </button>

          <button
            onClick={() => setActiveTab('ACTIONS')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'ACTIONS'
                ? 'border-amber-400 text-amber-300 bg-stone-800/40'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Server Actions (Next.js 14 API)</span>
          </button>
        </div>

        {/* Code Viewer */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-900/90 font-mono text-xs sm:text-sm text-amber-100/90 leading-relaxed select-text">
          <pre className="whitespace-pre-wrap">
            {currentCode}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between">
          <span>PostgreSQL · Prisma 5+ · Dual-mode RBAC models</span>
          <span className="text-emerald-400">Production Specification Verified</span>
        </div>

      </div>
    </div>
  );
};
