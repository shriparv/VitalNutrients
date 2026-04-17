import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Info, 
  AlertTriangle, 
  Apple, 
  Stethoscope, 
  ChevronRight, 
  X,
  Zap,
  Activity,
  Droplets,
  Heart,
  Brain,
  ShieldCheck,
  ArrowRight,
  Library,
  Scale
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { NUTRIENTS } from './data/nutrients';
import { Nutrient, SymptomAnalysis } from './types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const CATEGORY_STYLES = {
  Macro: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  Micro: 'bg-rose-50 text-rose-700 border-rose-100',
};

const TYPE_ICONS = {
  Protein: Zap,
  Carbohydrate: Activity,
  Fat: Droplets,
  Vitamin: ShieldCheck,
  Mineral: Brain,
  Fiber: Apple,
  Water: Droplets,
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNutrient, setSelectedNutrient] = useState<Nutrient | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'directory' | 'checker'>('directory');

  const filteredNutrients = useMemo(() => {
    return NUTRIENTS.filter(n => 
      n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const prompt = `Analyze the following human health symptoms: "${symptoms}". 
      Based on these symptoms, identify which nutrient deficiencies might be present.
      Focus on known macro and micro nutrients found in the human body.
      Provide the response in the following JSON format:
      {
        "possibleDeficiencies": ["Nutrient Name 1", "Nutrient Name 2"],
        "explanation": "Brief scientific explanation of how these symptoms correlate to the deficiencies.",
        "recommendations": ["Food/Lifestyle advice 1", "Food/Lifestyle advice 2"]
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              possibleDeficiencies: { type: Type.ARRAY, items: { type: Type.STRING } },
              explanation: { type: Type.STRING },
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["possibleDeficiencies", "explanation", "recommendations"],
          },
        },
      });

      const result = JSON.parse(response.text || '{}');
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis({
        possibleDeficiencies: ['Unknown'],
        explanation: 'Could not analyze symptoms at this time. Please try again.',
        recommendations: ['Consult a medical professional.']
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-bg-base">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-surface border-r border-border-subtle p-6 hidden lg:flex flex-col gap-8 z-50">
        <div className="flex items-center gap-2 text-brand font-bold text-xl tracking-tighter">
          <Activity size={24} />
          BioAtlas
        </div>
        
        <nav>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setActiveTab('directory')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'directory' ? 'bg-accent-soft text-brand' : 'text-text-secondary hover:text-text-main hover:bg-neutral-50'}`}
              >
                <Library size={18} />
                Nutrient Library
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('checker')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'checker' ? 'bg-accent-soft text-brand' : 'text-text-secondary hover:text-text-main hover:bg-neutral-50'}`}
              >
                <Stethoscope size={18} />
                Symptom Checker
              </button>
            </li>
          </ul>
        </nav>

        <div className="mt-auto p-4 bg-neutral-50 rounded-xl border border-border-subtle space-y-2">
          <p className="text-xs font-bold text-text-main uppercase tracking-wider">Quick Note</p>
          <p className="text-[11px] text-text-secondary leading-relaxed font-medium transition-opacity">
            Nutritional health is the foundation of peak physical performance. Explore the data to optimize yours.
          </p>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 h-16 bg-surface border-t border-border-subtle flex items-center justify-around px-4 z-50 shadow-lg">
        <button 
          onClick={() => setActiveTab('directory')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'directory' ? 'text-brand' : 'text-text-secondary'}`}
        >
          <Library size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Library</span>
        </button>
        <button 
          onClick={() => setActiveTab('checker')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'checker' ? 'text-brand' : 'text-text-secondary'}`}
        >
          <Stethoscope size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Checker</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 md:p-10 pb-24 lg:pb-10 transition-all">
        {activeTab === 'directory' ? (
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="space-y-1">
                <h2 className="text-xs uppercase tracking-[0.15em] font-bold text-text-secondary">Directory</h2>
                <h3 className="text-4xl font-black text-text-main tracking-tight">Essential Nutrients</h3>
              </div>
              
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                <input 
                  type="text" 
                  placeholder="Filter vitamins, minerals..."
                  className="w-full pl-10 pr-4 py-2 bg-surface border border-border-subtle rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredNutrients.map((nutrient) => {
                const Icon = TYPE_ICONS[nutrient.type as keyof typeof TYPE_ICONS] || Info;
                return (
                  <motion.div
                    key={nutrient.id}
                    layoutId={nutrient.id}
                    onClick={() => setSelectedNutrient(nutrient)}
                    whileHover={{ scale: 1.01, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)' }}
                    whileTap={{ scale: 0.99 }}
                    className="bg-surface border border-border-subtle p-6 rounded-xl cursor-pointer hover:border-brand transition-all group flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 border border-border-subtle rounded-lg text-brand bg-white">
                        <Icon size={20} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${CATEGORY_STYLES[nutrient.category]}`}>
                        {nutrient.category}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-text-main mb-2 tracking-tight">{nutrient.name}</h3>
                      <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed font-medium">
                        {nutrient.importance}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center text-xs font-bold text-brand uppercase tracking-widest gap-1 transition-all opacity-0 group-hover:opacity-100">
                      View Details <ArrowRight size={14} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-10 fade-in slide-in-from-bottom-2 duration-300">
            <div className="space-y-1">
              <h2 className="text-xs uppercase tracking-[0.15em] font-bold text-text-secondary">Analysis</h2>
              <h3 className="text-4xl font-black text-text-main tracking-tight">Symptom Checker</h3>
              <p className="text-text-secondary font-medium">Our AI-driven engine maps your signals to biochemical needs.</p>
            </div>

            <div className="bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand" />
              <p className="text-xs font-bold text-text-main uppercase mb-4 tracking-wider">Describe Symptoms</p>
              <textarea 
                placeholder="e.g. Brain fog, brittle nails, night vision issues..."
                className="w-full min-h-[140px] p-4 bg-bg-base border border-border-subtle rounded-xl focus:outline-none focus:ring-1 focus:ring-brand/30 transition-all resize-none text-sm text-text-main font-medium"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
              <button 
                onClick={analyzeSymptoms}
                disabled={isAnalyzing || !symptoms.trim()}
                className="w-full mt-4 py-3.5 bg-brand hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <Activity size={18} className="animate-spin" />
                ) : (
                  <>Begin Scan <ArrowRight size={18} /></>
                )}
              </button>
            </div>

            <AnimatePresence>
              {analysis && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface border border-border-subtle rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[400px]"
                >
                  {/* Left Column - Results */}
                  <div className="md:w-5/12 p-8 bg-accent-soft/30 border-r border-border-subtle space-y-8">
                    <div>
                      <h4 className="text-[10px] uppercase font-bold tracking-widest text-text-secondary mb-4">Prioritized Matches</h4>
                      <div className="space-y-2">
                        {analysis.possibleDeficiencies.map((d, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-white border border-border-subtle rounded-xl">
                            <span className="text-sm font-bold text-text-main">{d}</span>
                            <div className="w-1.5 h-1.5 bg-brand rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white border border-border-subtle rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-danger text-xs font-bold uppercase tracking-wider">
                        <AlertTriangle size={14} />
                        Advisory
                      </div>
                      <p className="text-[10px] leading-relaxed text-text-secondary font-medium">
                        This model identifies statistical correlations. Clinical tests are required for confirmation.
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Explanation */}
                  <div className="md:w-7/12 p-8 space-y-8">
                    <div>
                      <h4 className="text-[10px] uppercase font-bold tracking-widest text-text-secondary mb-3">Logic & Correlation</h4>
                      <p className="text-sm leading-relaxed text-text-main font-medium italic">
                        "{analysis.explanation}"
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[10px] uppercase font-bold tracking-widest text-text-secondary mb-4">Action Plan (Dietary)</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {analysis.recommendations.map((r, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-success/5 border border-success/10 rounded-xl">
                            <div className="mt-1 w-1.5 h-1.5 bg-success rounded-full shrink-0" />
                            <span className="text-xs text-text-main font-medium">{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Modern Overlay Detail View */}
      <AnimatePresence>
        {selectedNutrient && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNutrient(null)}
              className="fixed inset-0 bg-text-main/20 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              layoutId={selectedNutrient.id}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-surface z-[110] shadow-2xl flex flex-col border-l border-border-subtle"
            >
              <div className="p-8 border-bottom border-border-subtle flex items-center justify-between sticky top-0 bg-surface/80 backdrop-blur-md">
                <button 
                  onClick={() => setSelectedNutrient(null)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-text-secondary"
                >
                  <ArrowRight size={20} className="rotate-180" />
                </button>
                <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${CATEGORY_STYLES[selectedNutrient.category]}`}>
                  {selectedNutrient.id}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto p-10 pt-4 space-y-12">
                <div className="space-y-4">
                  <div className="p-3 border border-border-subtle rounded-xl text-brand inline-block mb-2">
                    {React.createElement(TYPE_ICONS[selectedNutrient.type as keyof typeof TYPE_ICONS] || Info, { size: 32 })}
                  </div>
                  <h2 className="text-4xl font-black text-text-main tracking-tighter">{selectedNutrient.name}</h2>
                  <p className="text-xl text-text-secondary font-medium leading-tight">
                    {selectedNutrient.importance}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-neutral-50 rounded-xl border border-border-subtle space-y-2">
                    <h4 className="text-[10px] uppercase font-bold text-text-secondary">Type</h4>
                    <p className="font-bold text-text-main">{selectedNutrient.type}</p>
                  </div>
                  <div className="p-5 bg-neutral-50 rounded-xl border border-border-subtle space-y-2">
                    <h4 className="text-[10px] uppercase font-bold text-text-secondary">Daily Priority</h4>
                    <p className="font-bold text-text-main">{selectedNutrient.category === 'Macro' ? 'High' : 'Selective'}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Biological Benefits</h4>
                    <div className="space-y-2">
                      {selectedNutrient.benefits.map((b, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-accent-soft/40 border border-accent-soft rounded-lg">
                          <CheckIcon className="text-brand shrink-0" />
                          <span className="text-sm font-medium text-text-main">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-rose-50/50 border border-rose-100 rounded-xl space-y-4">
                    <h4 className="text-[10px] uppercase font-bold text-rose-800 tracking-widest flex items-center gap-2">
                      <AlertTriangle size={14} /> Deficiency Impact
                    </h4>
                    <p className="text-sm font-medium text-rose-900 leading-relaxed">
                      {selectedNutrient.deficiency.effects}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedNutrient.deficiency.symptoms.map((s, i) => (
                        <span key={i} className="px-2 py-1 bg-white border border-rose-200 text-rose-700 text-[10px] font-bold uppercase rounded shadow-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h4 className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Bio-Available Sources</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedNutrient.sources.map((source, i) => (
                        <span key={i} className="px-4 py-2 bg-success/10 text-success border border-success/20 rounded-lg text-xs font-bold">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
