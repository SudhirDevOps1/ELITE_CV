
import React, { useState, useEffect } from 'react';
import ResumeEditor from './components/ResumeEditor';
import TemplateRenderer from './components/TemplateRenderer';
import Customizer from './components/Customizer';
import { ResumeData } from './types';
import { INITIAL_DATA } from './constants';

const App: React.FC = () => {
  const [resumes, setResumes] = useState<ResumeData[]>(() => {
    const saved = localStorage.getItem('pro-resumes-elite-v6');
    return saved ? JSON.parse(saved) : [INITIAL_DATA];
  });
  const [activeResumeId, setActiveResumeId] = useState<string>(resumes[0]?.id || INITIAL_DATA.id);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.65);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [showResumeList, setShowResumeList] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const activeData = resumes.find(r => r.id === activeResumeId) || resumes[0] || INITIAL_DATA;

  useEffect(() => {
    localStorage.setItem('pro-resumes-elite-v6', JSON.stringify(resumes));
  }, [resumes]);

  const updateActiveData = (newData: ResumeData) => {
    setResumes(prev => prev.map(r => r.id === activeResumeId ? { ...newData, updatedAt: Date.now() } : r));
  };

  const handleCreateNew = () => {
    const newResume = { 
      ...INITIAL_DATA, 
      id: `resume-${Date.now()}`, 
      title: 'New Resume Document',
      updatedAt: Date.now() 
    };
    setResumes(prev => [newResume, ...prev]);
    setActiveResumeId(newResume.id);
    setShowResumeList(false);
  };

  const prepareExportNode = (sourceId: string) => {
    const element = document.getElementById(sourceId);
    if (!element) return null;

    const exportWrapper = document.createElement('div');
    exportWrapper.style.position = 'fixed';
    exportWrapper.style.top = '0';
    exportWrapper.style.left = '-10000px';
    exportWrapper.style.width = '210mm';
    exportWrapper.style.zIndex = '-9999';
    exportWrapper.style.backgroundColor = 'white';

    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.transform = 'none';
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';
    clone.style.width = '210mm';
    clone.style.minHeight = '297mm';
    clone.style.visibility = 'visible';
    clone.style.display = 'block';

    exportWrapper.appendChild(clone);
    document.body.appendChild(exportWrapper);
    return { exportWrapper, clone };
  };

  const handleExportPDF = async () => {
    const exportData = prepareExportNode('resume-content');
    if (!exportData) return;
    
    setIsExporting(true);
    const { exportWrapper, clone } = exportData;

    try {
      const opt = {
        margin: [0, 0, 0, 0],
        filename: `${activeData.basics.fullName.replace(/\s+/g, '_')}_ProResume.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
          scale: 4, 
          useCORS: true, 
          letterRendering: true,
          backgroundColor: '#ffffff',
          logging: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
      
      // @ts-ignore
      await html2pdf().from(clone).set(opt).save();
    } catch (error) {
      console.error("PDF Export Failed:", error);
      alert("PDF Export failed. Ensure all sections are properly filled.");
    } finally {
      document.body.removeChild(exportWrapper);
      setIsExporting(false);
    }
  };

  const handleExportImage = async (format: 'png' | 'jpg') => {
    const exportData = prepareExportNode('resume-content');
    if (!exportData) return;
    
    setIsExporting(true);
    const { exportWrapper, clone } = exportData;

    try {
      // @ts-ignore
      const canvas = await html2canvas(clone, { scale: 4, useCORS: true, backgroundColor: '#ffffff', logging: false });
      const link = document.createElement('a');
      link.download = `${activeData.basics.fullName.replace(/\s+/g, '_')}_Resume.${format}`;
      link.href = canvas.toDataURL(`image/${format === 'png' ? 'png' : 'jpeg'}`, 1.0);
      link.click();
    } catch (error) {
      console.error("Image Export Failed:", error);
    } finally {
      document.body.removeChild(exportWrapper);
      setIsExporting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-950 text-slate-100 selection:bg-blue-600/30">
      <header className="h-16 bg-slate-900/90 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-50 shadow-2xl">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setShowResumeList(!showResumeList)}>
             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-all">
               <i className="fa fa-sparkles text-white text-lg"></i>
             </div>
             <div>
               <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                 Elite<span className="text-blue-500">CV</span>
               </h1>
               <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                 SudhirDevOps1
               </div>
             </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-sm mx-10 relative">
          <button 
            onClick={() => setShowResumeList(!showResumeList)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800 border border-white/10 rounded-2xl transition-all text-xs font-bold"
          >
            <span className="truncate flex items-center gap-3">
              <i className="fa fa-file-signature text-blue-400"></i>
              {activeData.title}
            </span>
            <i className={`fa fa-chevron-down text-[9px] text-slate-500 transition-transform ${showResumeList ? 'rotate-180' : ''}`}></i>
          </button>

          {showResumeList && (
            <div className="absolute top-full mt-4 w-full bg-slate-900 border border-white/10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-50 p-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="max-h-80 overflow-y-auto space-y-2 mb-3 hide-scrollbar">
                {resumes.map(r => (
                  <div 
                    key={r.id} 
                    onClick={() => { setActiveResumeId(r.id); setShowResumeList(false); }}
                    className={`group flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${activeResumeId === r.id ? 'bg-blue-600/20 border border-blue-500/50 text-blue-300' : 'bg-slate-800/30 border border-transparent hover:border-white/10'}`}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-black truncate uppercase tracking-wide">{r.title}</span>
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest">{new Date(r.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleCreateNew} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                + NEW DOCUMENT
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 bg-slate-800/30 p-1 rounded-xl border border-white/5">
             <button onClick={() => handleExportImage('png')} className="p-2.5 rounded-lg text-slate-400 hover:text-white transition-all" title="Save as Image"><i className="fa fa-image text-sm"></i></button>
             <button onClick={() => window.print()} className="p-2.5 rounded-lg text-slate-400 hover:text-white transition-all" title="Print"><i className="fa fa-print text-sm"></i></button>
          </div>
          <button 
            onClick={handleExportPDF} 
            disabled={isExporting}
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:-translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isExporting ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-file-pdf"></i>}
            {isExporting ? 'GENERATING...' : 'EXPORT PDF'}
          </button>
          
          <button 
            onClick={() => setIsMobilePreview(!isMobilePreview)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-2xl bg-slate-800 text-blue-500 border border-white/10"
          >
            <i className={`fa ${isMobilePreview ? 'fa-pen-nib' : 'fa-eye'}`}></i>
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <aside className={`w-full md:w-[480px] shrink-0 border-r border-white/5 bg-slate-900/50 h-full flex flex-col ${isMobilePreview ? 'hidden md:flex' : 'flex'}`}>
          <div className="flex p-3 gap-2 border-b border-white/5 bg-slate-900/50">
            <button onClick={() => setIsCustomizing(false)} className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black tracking-widest transition-all ${!isCustomizing ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-500 hover:bg-white/5'}`}>CONTENT</button>
            <button onClick={() => setIsCustomizing(true)} className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black tracking-widest transition-all ${isCustomizing ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-500 hover:bg-white/5'}`}>PRESETS</button>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {isCustomizing ? <Customizer data={activeData} onChange={updateActiveData} /> : <ResumeEditor data={activeData} onChange={updateActiveData} />}
          </div>
        </aside>

        <section className={`flex-1 bg-slate-950 overflow-auto relative p-8 md:p-16 flex flex-col items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black`}>
          <div className="fixed bottom-12 flex items-center gap-2 p-2 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50">
             <button onClick={() => setPreviewScale(Math.max(0.3, previewScale - 0.1))} className="w-10 h-10 rounded-xl hover:bg-slate-800 text-slate-400 transition-all active:scale-90"><i className="fa fa-minus"></i></button>
             <span className="text-[11px] font-black w-14 text-center text-slate-300">{Math.round(previewScale * 100)}%</span>
             <button onClick={() => setPreviewScale(Math.min(1.5, previewScale + 0.1))} className="w-10 h-10 rounded-xl hover:bg-slate-800 text-slate-400 transition-all active:scale-90"><i className="fa fa-plus"></i></button>
          </div>
          <div className="flex justify-center w-full min-h-full items-start">
            <div className="a4-page transition-transform duration-500 origin-top shadow-2xl" style={{ transform: `scale(${previewScale})` }}>
               <TemplateRenderer data={activeData} />
            </div>
          </div>
          <div className="mt-8 text-[10px] text-slate-500 font-bold uppercase tracking-[0.5em] pb-10">
            A4 Precision Mockup • Elite Rendering Engine
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
