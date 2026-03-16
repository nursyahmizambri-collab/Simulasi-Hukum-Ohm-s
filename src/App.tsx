/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, Gauge, Zap, Info, RefreshCw, Battery, Activity } from 'lucide-react';

// Types for our state
interface OhmState {
  voltage: number; // V
  resistance: number; // R
}

export default function App() {
  const [state, setState] = useState<OhmState>({
    voltage: 10,
    resistance: 5,
  });

  const [activeTab, setActiveTab] = useState<'simulasi' | 'teori'>('simulasi');
  const [vizMode, setVizMode] = useState<'air' | 'elektrik'>('air');
  const [selectedFormula, setSelectedFormula] = useState<'V' | 'I' | 'R' | null>(null);

  // Derive current: I = V / R
  const current = Number((state.voltage / state.resistance).toFixed(2));

  const handleVoltageChange = (val: number) => {
    setState(prev => ({ ...prev, voltage: val }));
  };

  const handleResistanceChange = (val: number) => {
    setState(prev => ({ ...prev, resistance: val }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Zap className="text-white w-5 h-5" />
            </div>
            <h1 className="font-bold text-xl tracking-tight">Analogi Hukum Ohm</h1>
          </div>
          <nav className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('simulasi')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'simulasi' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Simulasi
            </button>
            <button
              onClick={() => setActiveTab('teori')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'teori' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Teori
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'simulasi' ? (
            <motion.div
              key="simulasi"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Controls Section */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-8">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-blue-500" />
                    Kawalan Parameter
                  </h2>

                  {/* Voltage Slider */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-sm font-medium text-slate-600">Voltan (V)</label>
                      <span className="text-2xl font-bold text-blue-600">{state.voltage}V</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={state.voltage}
                      onChange={(e) => handleVoltageChange(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <p className="text-xs text-slate-400 italic">Analogi: Ketinggian tangki air (Tekanan)</p>
                  </div>

                  {/* Resistance Slider */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-sm font-medium text-slate-600">Rintangan (R)</label>
                      <span className="text-2xl font-bold text-red-500">{state.resistance}Ω</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={state.resistance}
                      onChange={(e) => handleResistanceChange(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                    <p className="text-xs text-slate-400 italic">Analogi: Kesempitan paip (Halangan)</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Arus Terhasil (I)</span>
                      <span className="text-3xl font-black text-emerald-600">{current}A</span>
                    </div>
                    <p className="text-xs text-slate-400 italic mt-1 text-right">Analogi: Kelajuan aliran air</p>
                    
                    <button 
                      onClick={() => setState({ voltage: 10, resistance: 5 })}
                      className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Tetapkan Semula (Reset)
                    </button>
                  </div>
                </div>

                {/* Formula Card */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap className="w-24 h-24" />
                  </div>
                  <h3 className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-4">Formula Segitiga</h3>
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="text-4xl font-mono tracking-tighter">
                      V = I × R
                    </div>
                    <div className="mt-4 text-sm text-slate-400 text-center">
                      {state.voltage}V = {current}A × {state.resistance}Ω
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Analogy Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[500px] flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-semibold text-lg flex items-center gap-2">
                      {vizMode === 'air' ? (
                        <Droplets className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Zap className="w-5 h-5 text-yellow-500" />
                      )}
                      {vizMode === 'air' ? 'Visualisasi Analogi Air' : 'Visualisasi Litar Elektrik'}
                    </h2>
                    
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                      <button
                        onClick={() => setVizMode('air')}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${
                          vizMode === 'air' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        <Droplets className="w-3 h-3" />
                        Air
                      </button>
                      <button
                        onClick={() => setVizMode('elektrik')}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${
                          vizMode === 'elektrik' ? 'bg-white text-yellow-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        <Zap className="w-3 h-3" />
                        Elektrik
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 bg-slate-50 rounded-xl border border-dashed border-slate-200 p-8 flex flex-col items-center justify-center min-h-[600px] overflow-hidden relative">
                    <AnimatePresence mode="wait">
                      {vizMode === 'air' ? (
                        <motion.div 
                          key="air-viz"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          {/* Master Water Analogy System */}
                          <div className="relative w-full max-w-4xl flex items-end justify-center h-[400px]">
                            
                            {/* 1. THE TANK (VOLTAGE = PRESSURE) */}
                            <div className="relative flex flex-col items-center">
                              {/* Tank Top Structure */}
                              <div className="w-32 h-6 bg-slate-400 rounded-t-2xl mb-[-4px] z-20 shadow-lg border-x-4 border-t-4 border-slate-500" />
                              
                              {/* Tank Body */}
                              <div className="w-48 h-80 bg-white/95 border-4 border-slate-400 rounded-b-3xl relative overflow-hidden shadow-2xl backdrop-blur-sm z-10">
                                {/* Water in Tank */}
                                <motion.div 
                                  animate={{ height: `${(state.voltage / 30) * 100}%` }}
                                  transition={{ type: "spring", stiffness: 35, damping: 15 }}
                                  className="absolute bottom-0 w-full bg-gradient-to-t from-blue-900 via-blue-600 to-blue-400"
                                >
                                  {/* Surface Ripples & Foam */}
                                  <motion.div 
                                    animate={{ 
                                      x: ["-20%", "20%"],
                                      opacity: [0.4, 0.7, 0.4]
                                    }}
                                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                    className="absolute top-0 left-[-25%] w-[150%] h-10 bg-blue-100/40 blur-xl -translate-y-5"
                                  />
                                  
                                  {/* Internal Pressure Bubbles */}
                                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    {[...Array(8)].map((_, i) => (
                                      <motion.div
                                        key={i}
                                        animate={{ 
                                          y: [300, -40],
                                          opacity: [0, 0.5, 0],
                                          scale: [0.3, 1, 0.3]
                                        }}
                                        transition={{ 
                                          repeat: Infinity, 
                                          duration: 3 + Math.random() * 3,
                                          delay: i * 0.8,
                                          ease: "easeOut"
                                        }}
                                        className="absolute w-2.5 h-2.5 bg-white/30 rounded-full"
                                        style={{ left: `${10 + i * 12}%` }}
                                      />
                                    ))}
                                  </div>
                                </motion.div>
                                
                                {/* Scale Markings with Numbers */}
                                <div className="absolute left-0 inset-y-0 w-8 flex flex-col justify-between py-10 px-1.5 opacity-50 pointer-events-none">
                                  {[...Array(7)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-1">
                                      <div className="h-[2px] w-full bg-slate-900" />
                                      <span className="text-[8px] font-bold text-slate-600">{30 - i * 5}</span>
                                    </div>
                                  ))}
                                </div>

                                {/* Central Pressure Gauge Look */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <motion.div 
                                    animate={{ 
                                      scale: state.voltage > 25 ? [1, 1.08, 1] : 1,
                                      boxShadow: state.voltage > 25 ? "0 0 30px rgba(59, 130, 246, 0.5)" : "0 10px 25px rgba(0,0,0,0.1)"
                                    }}
                                    transition={{ repeat: state.voltage > 25 ? Infinity : 0, duration: 0.8 }}
                                    className="bg-white/90 backdrop-blur-lg p-4 rounded-full border-2 border-blue-200 shadow-2xl flex flex-col items-center justify-center w-32 h-32"
                                  >
                                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Tekanan</div>
                                    <div className="text-blue-900 font-black text-4xl leading-none">{state.voltage}</div>
                                    <div className="text-[12px] font-bold text-blue-400 mt-1">VOLT</div>
                                  </motion.div>
                                </div>
                              </div>
                              
                              {/* Tank Label */}
                              <div className="mt-8 flex flex-col items-center">
                                <div className="w-12 h-2 bg-slate-300 rounded-full mb-2" />
                                <span className="text-sm font-black text-blue-900 uppercase tracking-[0.2em]">Punca Voltan</span>
                              </div>

                              {/* DYNAMIC OUTLET CONNECTION (Perfectly Aligned) */}
                              <motion.div 
                                animate={{ 
                                  height: Math.max(15, 100 - (state.resistance * 4.5)),
                                }}
                                className="absolute bottom-16 -right-4 w-8 bg-slate-400 border-y-4 border-slate-500 z-0 shadow-lg" 
                              />
                            </div>

                            {/* 2. THE PIPE (RESISTANCE = DIAMETER) */}
                            <div className="flex-1 flex items-end h-80 pb-16 relative">
                              <motion.div 
                                animate={{ 
                                  height: Math.max(15, 100 - (state.resistance * 4.5)),
                                }}
                                transition={{ type: "spring", stiffness: 45, damping: 12 }}
                                className="w-full bg-slate-300 border-y-4 border-slate-500 relative overflow-hidden shadow-[inset_0_8px_20px_rgba(0,0,0,0.25)] flex items-center"
                              >
                                {/* Flowing Water Animation (Enhanced) */}
                                <div className="absolute inset-0 flex">
                                  <motion.div
                                    animate={{ x: ["-50%", "0%"] }}
                                    transition={{ 
                                      repeat: Infinity, 
                                      duration: Math.max(0.03, 7 / (current + 0.1)), 
                                      ease: "linear" 
                                    }}
                                    className="flex w-[200%] h-full"
                                  >
                                    {[...Array(20)].map((_, i) => (
                                      <div key={i} className="flex-1 h-full flex items-center justify-center opacity-60">
                                        <div className="w-[98%] h-[80%] bg-blue-500 rounded-full blur-[5px] skew-x-12" />
                                      </div>
                                    ))}
                                  </motion.div>
                                </div>
                                
                                {/* Resistance Label (Floating Badge) */}
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                  <motion.div 
                                    animate={{ rotate: state.resistance > 15 ? [-2, 2, -2] : 0 }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="bg-red-700 text-white text-[12px] font-black px-5 py-2 rounded-full shadow-[0_5px_15px_rgba(185,28,28,0.4)] border-2 border-red-400"
                                  >
                                    RINTANGAN: {state.resistance}Ω
                                  </motion.div>
                                </div>
                              </motion.div>
                              
                              {/* Pipe Label */}
                              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center w-full">
                                <span className="text-sm font-black text-red-800 uppercase tracking-[0.2em]">Laluan Arus</span>
                                <span className="text-[10px] text-slate-500 font-bold italic mt-1">Diameter berubah mengikut rintangan</span>
                              </div>
                            </div>

                            {/* 3. THE EXIT (CURRENT = FLOW RATE) */}
                            <div className="relative flex flex-col items-center h-80">
                              {/* DYNAMIC ELBOW JOINT & NOZZLE */}
                              <motion.div 
                                animate={{ 
                                  height: Math.max(15, 100 - (state.resistance * 4.5)),
                                }}
                                className="w-28 bg-slate-500 border-4 border-slate-600 rounded-r-3xl relative z-20 flex items-center justify-end pr-4 shadow-2xl"
                              >
                                 <div className="w-10 h-[85%] bg-slate-900 rounded-full opacity-60 shadow-inner" />
                              </motion.div>
                              
                              {/* Falling Water Stream (Highly Dynamic) */}
                              <div className="relative w-full flex-1 flex flex-col items-center pt-4">
                                <AnimatePresence>
                                  {current > 0 && (
                                    <>
                                      {/* Main Falling Stream */}
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ 
                                          height: 260, 
                                          opacity: 1,
                                          width: Math.min(100, current * 7 + 8)
                                        }}
                                        transition={{ type: "spring", stiffness: 55, damping: 15 }}
                                        className="bg-gradient-to-b from-blue-500 via-blue-400 to-transparent rounded-b-full shadow-[0_25px_60px_rgba(59,130,246,0.6)] relative overflow-hidden"
                                      >
                                        {/* Inner Flow Texture */}
                                        <motion.div 
                                          animate={{ y: ["-100%", "0%"] }}
                                          transition={{ repeat: Infinity, duration: Math.max(0.1, 2 / (current + 1)), ease: "linear" }}
                                          className="absolute inset-0 flex flex-col"
                                        >
                                          {[...Array(5)].map((_, i) => (
                                            <div key={i} className="flex-1 w-full bg-white/20 blur-[4px] my-4 rounded-full" />
                                          ))}
                                        </motion.div>
                                      </motion.div>
                                      
                                      {/* Intense Splash Effect */}
                                      <motion.div 
                                        animate={{ 
                                          scale: [1, 1.5, 1],
                                          opacity: [0.7, 1, 0.7]
                                        }}
                                        transition={{ repeat: Infinity, duration: 0.3 }}
                                        className="absolute bottom-[-30px] w-56 h-16 bg-blue-300/70 blur-[40px] rounded-full"
                                      />

                                      {/* High-Velocity Particles */}
                                      <div className="absolute top-20 w-full flex justify-center pointer-events-none">
                                        {[...Array(Math.min(40, Math.floor(current * 5 + 10)))].map((_, i) => (
                                          <motion.div
                                            key={i}
                                            animate={{ 
                                              y: [0, 220 + Math.random() * 100],
                                              x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 200],
                                              opacity: [0, 1, 0],
                                              scale: [0, 1.8, 0]
                                            }}
                                            transition={{ 
                                              repeat: Infinity, 
                                              duration: Math.max(0.1, 2 / (current + 1)), 
                                              delay: i * 0.05,
                                              ease: "easeIn" 
                                            }}
                                            className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                                          />
                                        ))}
                                      </div>
                                    </>
                                  )}
                                </AnimatePresence>
                              </div>
                              
                              {/* Current Label (Final Result) */}
                              <div className="mt-12 flex flex-col items-center">
                                <motion.div 
                                  animate={{ scale: [1, 1.05, 1] }}
                                  transition={{ repeat: Infinity, duration: 1 }}
                                  className="bg-emerald-600 text-white text-xl font-black px-10 py-3 rounded-full shadow-[0_10px_30px_rgba(5,150,105,0.5)] border-4 border-emerald-400"
                                >
                                  {current}A
                                </motion.div>
                                <span className="text-sm font-black text-emerald-800 uppercase mt-3 tracking-[0.3em]">Hasil Arus</span>
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="electric-viz"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          className="w-full h-full flex flex-col items-center justify-center"
                        >
                          <div className="relative w-full max-w-2xl aspect-video bg-white rounded-3xl border-4 border-slate-200 shadow-inner flex items-center justify-center p-12">
                            {/* Circuit Path SVG */}
                            <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible">
                              {/* Main Wire Path */}
                              <rect 
                                x="50" y="50" width="300" height="200" 
                                fill="none" 
                                stroke="#334155" 
                                strokeWidth="8" 
                                rx="20"
                              />
                              
                              {/* Battery (Voltage Source) */}
                              <g transform="translate(35, 120)">
                                <rect x="0" y="0" width="30" height="60" rx="4" fill="#1e40af" />
                                <rect x="5" y="-5" width="20" height="5" rx="2" fill="#3b82f6" />
                                <text x="15" y="35" textAnchor="middle" fill="white" className="font-bold text-[10px] select-none">V</text>
                                <text x="15" y="50" textAnchor="middle" fill="white" className="font-black text-[14px] select-none">{state.voltage}V</text>
                                <Battery className="w-4 h-4 text-blue-200 absolute -top-10 left-2" />
                              </g>

                              {/* Resistor (Zigzag) */}
                              <g transform="translate(160, 40)">
                                <rect x="0" y="0" width="80" height="20" fill="white" />
                                <path 
                                  d="M 0 10 L 10 0 L 20 20 L 30 0 L 40 20 L 50 0 L 60 20 L 70 0 L 80 10" 
                                  fill="none" 
                                  stroke="#b91c1c" 
                                  strokeWidth="4" 
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <text x="40" y="-15" textAnchor="middle" fill="#b91c1c" className="font-black text-[14px] select-none">{state.resistance}Ω</text>
                              </g>

                              {/* Electrons (Moving Particles) */}
                              {[...Array(15)].map((_, i) => {
                                // Calculate total path length: 300*2 + 200*2 = 1000
                                // We'll use a simple percentage-based position
                                return (
                                  <motion.circle
                                    key={i}
                                    r="5"
                                    fill="#fbbf24"
                                    className="shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                                    animate={{
                                      // Path: Top-Left (50,50) -> Top-Right (350,50) -> Bottom-Right (350,250) -> Bottom-Left (50,250) -> Top-Left (50,50)
                                      cx: [50, 350, 350, 50, 50],
                                      cy: [50, 50, 250, 250, 50]
                                    }}
                                    transition={{
                                      repeat: Infinity,
                                      duration: Math.max(0.5, 10 / (current + 0.1)),
                                      delay: (i * (10 / (current + 0.1))) / 15,
                                      ease: "linear"
                                    }}
                                  />
                                );
                              })}

                              {/* Current Meter */}
                              <g transform="translate(330, 120)">
                                <circle cx="20" cy="30" r="35" fill="white" stroke="#059669" strokeWidth="4" />
                                <Activity className="w-5 h-5 text-emerald-600 absolute top-2 left-7" />
                                <text x="20" y="35" textAnchor="middle" fill="#059669" className="font-black text-[16px] select-none">{current}A</text>
                                <text x="20" y="50" textAnchor="middle" fill="#059669" className="font-bold text-[8px] uppercase select-none">Arus</text>
                              </g>
                            </svg>

                            {/* Legend Overlay */}
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-600 rounded-sm" /> Punca Voltan
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-600 rounded-sm" /> Rintangan
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full" /> Elektron (Arus)
                              </div>
                            </div>
                          </div>

                          <div className="mt-12 max-w-md text-center">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Bagaimana Litar Berfungsi?</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                              Dalam litar elektrik, <strong>Voltan</strong> menolak <strong>Elektron</strong> (zarah kuning) melalui wayar. 
                              <strong>Rintangan</strong> menghalang aliran ini. Semakin tinggi rintangan, semakin perlahan elektron bergerak (Arus berkurang).
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <h4 className="text-xs font-bold text-blue-600 uppercase mb-1">Voltan (V)</h4>
                      <p className="text-sm text-slate-600">
                        {vizMode === 'air' 
                          ? 'Semakin tinggi tangki, semakin kuat tekanan air menolak ke bawah.' 
                          : 'Daya tolakan elektrik yang menggerakkan elektron melalui litar.'}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                      <h4 className="text-xs font-bold text-red-600 uppercase mb-1">Rintangan (R)</h4>
                      <p className="text-sm text-slate-600">
                        {vizMode === 'air' 
                          ? 'Semakin sempit paip, semakin sukar air untuk mengalir melaluinya.' 
                          : 'Halangan dalam litar yang memperlahankan aliran elektron.'}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                      <h4 className="text-xs font-bold text-emerald-600 uppercase mb-1">Arus (I)</h4>
                      <p className="text-sm text-slate-600">
                        {vizMode === 'air' 
                          ? 'Hasil akhir - berapa banyak air yang berjaya mengalir keluar setiap saat.' 
                          : 'Kadar aliran elektron yang mengalir melalui litar elektrik.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="teori"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold mb-4 text-slate-900">Apa itu Hukum Ohm?</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Hukum Ohm menyatakan bahawa arus elektrik yang mengalir melalui suatu konduktor adalah berkadar terus dengan voltan yang merentasi konduktor tersebut, dengan syarat suhu dan keadaan fizikal lain adalah tetap.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 italic text-blue-900">
                  "Arus (I) bertambah jika Voltan (V) bertambah, tetapi Arus (I) berkurang jika Rintangan (R) bertambah."
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Voltan (V)</h3>
                  <p className="text-sm text-slate-500">Dikenali sebagai beza keupayaan. Ia adalah 'tekanan' yang menolak cas elektrik melalui litar. Unit: <strong>Volt (V)</strong>.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Arus (I)</h3>
                  <p className="text-sm text-slate-500">Kadar pengaliran cas elektrik dalam litar. Bayangkan seperti kelajuan air mengalir. Unit: <strong>Ampere (A)</strong>.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4 text-red-600">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Rintangan (R)</h3>
                  <p className="text-sm text-slate-500">Sifat bahan yang menghalang pengaliran arus elektrik. Unit: <strong>Ohm (Ω)</strong>.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4 text-slate-600">
                    <Info className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Hubungan Matematik</h3>
                  <p className="text-sm text-slate-500">V = I × R <br/> I = V / R <br/> R = V / I</p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Tips Menghafal: Segitiga VIR</h3>
                  <p className="text-slate-400 mb-8 text-sm">Klik pada huruf di dalam segitiga untuk melihat cara mencari nilai tersebut. Konsepnya mudah: <strong>Tutup huruf yang ingin dicari!</strong></p>
                  
                  <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                    {/* Interactive Triangle */}
                    <div className="relative w-64 h-56">
                      <svg viewBox="0 0 100 85" className="w-full h-full drop-shadow-2xl">
                        <path d="M50 5 L95 80 L5 80 Z" fill="none" stroke="#334155" strokeWidth="2" />
                        <line x1="25" y1="45" x2="75" y2="45" stroke="#334155" strokeWidth="2" />
                        <line x1="50" y1="45" x2="50" y2="80" stroke="#334155" strokeWidth="2" />
                        
                        {/* V Area */}
                        <g 
                          className="cursor-pointer group" 
                          onClick={() => setSelectedFormula('V')}
                        >
                          <circle cx="50" cy="28" r="12" className={`transition-colors ${selectedFormula === 'V' ? 'fill-blue-600' : 'fill-slate-800 group-hover:fill-slate-700'}`} />
                          <text x="50" y="32" textAnchor="middle" className="fill-white font-bold text-[10px] pointer-events-none">V</text>
                        </g>

                        {/* I Area */}
                        <g 
                          className="cursor-pointer group" 
                          onClick={() => setSelectedFormula('I')}
                        >
                          <circle cx="32" cy="62" r="12" className={`transition-colors ${selectedFormula === 'I' ? 'fill-emerald-600' : 'fill-slate-800 group-hover:fill-slate-700'}`} />
                          <text x="32" y="66" textAnchor="middle" className="fill-white font-bold text-[10px] pointer-events-none">I</text>
                        </g>

                        {/* R Area */}
                        <g 
                          className="cursor-pointer group" 
                          onClick={() => setSelectedFormula('R')}
                        >
                          <circle cx="68" cy="62" r="12" className={`transition-colors ${selectedFormula === 'R' ? 'fill-red-600' : 'fill-slate-800 group-hover:fill-slate-700'}`} />
                          <text x="68" y="66" textAnchor="middle" className="fill-white font-bold text-[10px] pointer-events-none">R</text>
                        </g>
                      </svg>
                    </div>

                    {/* Formula Explanation */}
                    <div className="flex-1 min-h-[120px] flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        {!selectedFormula ? (
                          <motion.div 
                            key="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center text-slate-500 italic"
                          >
                            Klik huruf pada segitiga...
                          </motion.div>
                        ) : (
                          <motion.div 
                            key={selectedFormula}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full"
                          >
                            {selectedFormula === 'V' && (
                              <div className="space-y-2">
                                <h4 className="text-blue-400 font-bold uppercase text-xs">Mencari Voltan (V)</h4>
                                <div className="text-3xl font-mono">V = I × R</div>
                                <p className="text-xs text-slate-400">Kerana I dan R berada bersebelahan, kita darabkan mereka.</p>
                              </div>
                            )}
                            {selectedFormula === 'I' && (
                              <div className="space-y-2">
                                <h4 className="text-emerald-400 font-bold uppercase text-xs">Mencari Arus (I)</h4>
                                <div className="text-3xl font-mono">I = V / R</div>
                                <p className="text-xs text-slate-400">Kerana V berada di atas R, kita bahagikan V dengan R.</p>
                              </div>
                            )}
                            {selectedFormula === 'R' && (
                              <div className="space-y-2">
                                <h4 className="text-red-400 font-bold uppercase text-xs">Mencari Rintangan (R)</h4>
                                <div className="text-3xl font-mono">R = V / I</div>
                                <p className="text-xs text-slate-400">Kerana V berada di atas I, kita bahagikan V dengan I.</p>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-12 border-t border-slate-200 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
          <p>© 2026 RBT Cikgu Syahmi</p>
        </div>
      </footer>
    </div>
  );
}
