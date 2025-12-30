export default function Hero() {
  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#14B8A6] bg-clip-text text-transparent">
              Deadman Vault
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
            Secure Your Digital Legacy with Automated Inheritance
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Create vaults with deadman switch functionality. If you stop pinging, your beneficiary inherits everything automatically.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto pt-8">
            <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-lg p-4 border border-[#3B82F6]/20">
              <div className="text-2xl sm:text-3xl font-bold text-[#60A5FA]">0</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">Vaults Created</div>
            </div>
            <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-lg p-4 border border-[#14B8A6]/20">
              <div className="text-2xl sm:text-3xl font-bold text-[#5EEAD4]">0 ETH</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">Total Locked</div>
            </div>
            <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-lg p-4 border border-[#FFD700]/20">
              <div className="text-2xl sm:text-3xl font-bold text-[#FFD700]">0</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">Claims Processed</div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <button className="px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#14B8A6] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#3B82F6]/20">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
