import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-20 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#14B8A6] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl"></div>
      </div>
      
      {/* DeFi-related background icons */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-6xl">🔐</div>
        <div className="absolute top-40 right-32 text-4xl">⏰</div>
        <div className="absolute bottom-32 left-32 text-5xl">💰</div>
        <div className="absolute top-32 left-1/3 text-5xl">🎁</div>
        <div className="absolute bottom-20 right-1/4 text-4xl">🏦</div>
        <div className="absolute top-1/2 right-20 text-4xl">⚡</div>
        <div className="absolute bottom-1/3 left-1/4 text-5xl">🛡️</div>
        <div className="absolute top-1/3 right-1/3 text-4xl">🔗</div>
        <div className="absolute bottom-1/2 right-1/2 text-5xl">💎</div>
      </div>
     
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[60vh]">
          {/* Left Side - Text Content */}
          <div className="text-left">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#5EEAD4] drop-shadow-lg">
                Deadman Vault
              </h1>
              <p className="text-sm md:text-base lg:text-lg mb-2 opacity-95 font-semibold">
                Secure Your Digital Legacy
              </p>
            </div>
            
            <p className="text-base md:text-lg lg:text-xl mb-8 opacity-95 font-medium leading-relaxed">
              Create vaults with deadman switch functionality. If you stop pinging, your beneficiary inherits everything automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-[#3B82F6] text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-[#60A5FA] transition-all duration-300 flex items-center justify-center">
                Get Started 
                <ArrowRight className="ml-2" size={18} />
              </button>
              <a 
                href="#how-it-works"
                className="group border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-base hover:bg-white hover:text-[#0F172A] transition-all duration-300 text-center"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Right Side - Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-[#60A5FA]">0</div>
              <div className="text-sm text-gray-300 mt-1">Vaults Created</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-[#5EEAD4]">0 ETH</div>
              <div className="text-sm text-gray-300 mt-1">Total Locked</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-[#FFD700]">0</div>
              <div className="text-sm text-gray-300 mt-1">Claims Processed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-[#60A5FA]">Base</div>
              <div className="text-sm text-gray-300 mt-1">Network</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="relative">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
          <path d="M0,96L48,80C96,64,192,32,288,42.7C384,53,480,107,576,128C672,149,768,139,864,122.7C960,107,1056,85,1152,90.7C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}
