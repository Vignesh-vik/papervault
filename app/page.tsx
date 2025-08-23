import Component from "../vercel-logo-particles"

export default function Page() {
  return<>
  
  <div className="w-screen h-screen overflow-x-hidden">
      {/* Section 1: Fullscreen Galaxy */}
      <section className="h-screen w-full">
        <Component />
      </section>

      {/* Section 2: Upload UI */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[28rem] text-center">
          <h1 className="text-4xl font-bold mb-6 text-white">🚀 PaperVault</h1>

          <input
            type="file"
            accept=".pdf"
            className="mb-6 block w-full text-sm text-gray-300
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-600 file:text-white
                       hover:file:bg-blue-700"
          />

          <button className="px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold">
            Upload
          </button>
        </div>
      </section>
    </div>
    </>
}
