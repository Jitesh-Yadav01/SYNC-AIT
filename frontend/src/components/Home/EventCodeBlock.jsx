import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";

export function EventCodeBlock() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('INNERVE');

  const tabs = ['INNERVE', 'GENESIS', 'CODEFT', 'SOLUTIONS', 'CTF'];

  const handleCopy = () => {
    navigator.clipboard.writeText("https://innerve.tech/");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <section id="events" className="pt-4 pb-44 mb-20 px-6 sm:px-8 max-w-[1200px] mx-auto w-full relative z-10 font-mono">
      <div className="mb-12 md:mb-16 mt-8 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          Flagship Technical Events
        </h2>
        <p className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed">
          Explore the biggest hackathons and technical events organized by clubs.
        </p>
      </div>

      <div className="mx-auto w-full max-w-5xl rounded-xl border border-white/5 bg-transparent shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-white/5 opacity-50 z-0" />
        <div className="relative z-10 flex items-center overflow-x-auto border-b border-white/10 px-2 pt-2 scrollbar-none bg-[#0a0a0a]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-4 text-sm font-semibold tracking-wider transition-all duration-300 border-b-2 whitespace-nowrap",
                activeTab === tab
                  ? "border-white text-white bg-white/5"
                  : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative z-10 p-6 sm:p-8 overflow-x-auto text-sm leading-relaxed text-gray-400 font-mono bg-[#0a0a0a]">
          {activeTab === 'INNERVE' ? (
            <pre className="m-0">
              <code className="text-sm">
                <span className="text-gray-400">const</span> <span className="text-white">eventConfig</span> <span className="text-gray-400">=</span> {"{\n"}
                {"  "}<span className="text-gray-300">name</span><span className="text-gray-400">:</span> <span className="text-gray-400">"INNERVE X"</span>{",\n"}
                {"  "}<span className="text-gray-300">tagline</span><span className="text-gray-400">:</span> <span className="text-gray-400">"India's Largest Student-Driven Hackathon"</span>{",\n"}
                {"  "}<span className="text-gray-300">organizer</span><span className="text-gray-400">:</span> <span className="text-gray-400">"Open Source Software Club"</span>{",\n"}
                {"  "}<span className="text-gray-300">location</span><span className="text-gray-400">:</span> <span className="text-gray-400">"Army Institute of Technology, Pune"</span>{",\n"}
                {"  "}<span className="text-gray-300">about</span><span className="text-gray-400">:</span> <span className="text-gray-400">"INNERVE brings innovators together to build impactful solutions and compete for a ₹12 Lakh+ prize pool."</span>{",\n"}
                {"  "}<span className="text-gray-300">schedule</span><span className="text-gray-400">:</span> {"{\n"}
                {"    "}<span className="text-gray-300">ideaPitching</span><span className="text-gray-400">:</span> <span className="text-gray-400">"20 Dec 2025 - 15 Jan 2026"</span>{",\n"}
                {"    "}<span className="text-gray-300">finalHackathon</span><span className="text-gray-400">:</span> <span className="text-gray-400">"30 - 31 Jan 2026 (24-Hour)"</span>{",\n"}
                {"  }"}{",\n"}
                {"  "}<span className="text-gray-300">prizes</span><span className="text-gray-400">:</span> {"{\n"}
                {"    "}<span className="text-gray-300">topPrize</span><span className="text-gray-400">:</span> <span className="text-gray-400">"₹1,25,000 + Goodies"</span>{",\n"}
                {"    "}<span className="text-gray-300">totalPool</span><span className="text-gray-400">:</span> <span className="text-gray-400">"₹12 Lakh+"</span>{",\n"}
                {"  }"}{",\n"}
                {"  "}<span className="text-gray-300">preEvents</span><span className="text-gray-400">:</span> {"[\n"}
                {"    { "}<span className="text-gray-300">event</span><span className="text-gray-400">:</span> <span className="text-gray-400">"Clash Royale Tournament"</span>{", "}<span className="text-gray-300">date</span><span className="text-gray-400">:</span> <span className="text-gray-400">"21 Jan 2026"</span>{" },\n"}
                {"    { "}<span className="text-gray-300">event</span><span className="text-gray-400">:</span> <span className="text-gray-400">"Dev Quiz (Tech & Coding Quiz)"</span>{", "}<span className="text-gray-300">date</span><span className="text-gray-400">:</span> <span className="text-gray-400">"24 Jan 2026"</span>{" },\n"}
                {"    { "}<span className="text-gray-300">event</span><span className="text-gray-400">:</span> <span className="text-gray-400">"Meme War (Creative Contest)"</span>{", "}<span className="text-gray-300">date</span><span className="text-gray-400">:</span> <span className="text-gray-400">"21-25 Jan 2026"</span>{" }\n"}
                {"  ]"}{",\n"}
                {"  "}<span className="text-gray-300">registrationLink</span><span className="text-gray-400">:</span> <span className="text-gray-400">"https://innerve.tech/"</span>{"\n"}
                {"}\n"}
              </code>
            </pre>
          ) : (
            <div className="flex h-[400px] items-center justify-center text-gray-600">
              Data for {activeTab} will be available soon.
            </div>
          )}

          <button
            onClick={handleCopy}
            className="absolute bottom-6 right-6 p-2 rounded-md bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Copy to clipboard"
          >
            {copied ? <Check className="h-5 w-5 text-[#e2ff46]" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </section>
  );
}
