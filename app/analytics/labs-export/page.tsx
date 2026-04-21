'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LabsExportPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const correctPassword = '7x.ae@fuad.alnsour';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === correctPassword) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/labs/export?pwd=${encodeURIComponent(correctPassword)}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Lab_Responses.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      setError('Failed to download file');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] via-[#F0F4FF] to-[#FAFBFC] flex items-center justify-center p-6">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -right-40 w-80 h-80 bg-[#0056FF] rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-[#32E396] rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-sm border-2 border-[#E5E7EB] rounded-xl shadow-xl p-8 max-w-md w-full relative z-10"
      >
        {!isAuthenticated ? (
          <>
            <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Lab Export</h1>
            <p className="text-[#4B5563] mb-8">Enter password to download lab responses</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#1F2937] mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#0056FF] focus:outline-none transition-colors"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#0056FF] to-[#0040CC] text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Login
              </motion.button>
            </form>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="text-5xl mb-4">✓</div>
              <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Access Granted</h1>
              <p className="text-[#4B5563] mb-8">Download lab responses as Excel file</p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#32E396] to-[#10B981] text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isDownloading ? 'Downloading...' : 'Download Lab_Responses.xlsx'}
              </motion.button>

              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setPassword('');
                  setError('');
                }}
                className="w-full mt-3 px-6 py-3 text-[#0056FF] font-bold border-2 border-[#0056FF] rounded-lg hover:bg-[#0056FF]/10 transition-all"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
