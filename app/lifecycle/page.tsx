'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const stages = [
  { id: 'lead-new', name: 'Lead - New', description: 'A potential customer identified', color: '#10B981', entryLogic: 'Created from marketing list, referral, or inbound inquiry', exitLogic: 'Move to Verification after Company Identity check begins', userActions: ['Research company and stakeholders', 'Schedule initial conversation', 'Gather preliminary qualification data'], commonMistakes: ['Reaching out without research', 'Contacting wrong stakeholder', 'Skipping Company Identity verification'] },
  { id: 'lead-verification', name: 'Lead - Verification', description: 'Validating company identity and initial fit', color: '#14B8A6', entryLogic: 'Company Identity gate begins - verify registration, financials, business model fit', exitLogic: 'Either move to Qualified (pass Gate 1) or Disqualified (fail Gate 1)', userActions: ['Verify official corporate registration', 'Check financial stability indicators', 'Confirm industry/business model alignment', 'Identify key stakeholders'], commonMistakes: ['Moving too fast without proper due diligence', 'Accepting vague company information', 'Skipping stakeholder research'] },
  { id: 'lead-qualified', name: 'Lead - Qualified', description: 'Passed initial gates; ready for opportunity exploration', color: '#10B981', entryLogic: 'Pass Gates 1 & 2: Company Identity verified, right stakeholders engaged', exitLogic: 'Move to Account Conversion (create Account) or back to unqualified', userActions: ['Schedule discovery calls with decision-makers', 'Understand business problems and pain points', 'Assess fit and viability', 'Prepare conversion proposal'], commonMistakes: ['Talking about features instead of problems', 'Not involving all decision-makers', 'Rushing to proposal without consensus'] },
  { id: 'account-conversion', name: 'Account - Conversion', description: 'Moving from Lead to Account relationship', color: '#14B8A6', entryLogic: 'Create Account record with approved hierarchy and data structure', exitLogic: 'Account onboarding begins', userActions: ['Create Account with correct parent/child hierarchy', 'Set Contact roles and relationships', 'Establish data stewardship roles', 'Configure account team'], commonMistakes: ['Creating duplicate Accounts', 'Wrong parent-child hierarchy', 'Missing Contact relationships'] },
  { id: 'account-onboarding', name: 'Account - Onboarding', description: 'New account setup and initial engagement', color: '#10B981', entryLogic: 'Account created and data structure validated', exitLogic: 'Move to Active after onboarding checklist complete', userActions: ['Kick off onboarding calls', 'Deliver implementation plan', 'Set expectations for communication and engagement', 'Schedule first business review'], commonMistakes: ['No structured onboarding plan', 'Unclear expectations', 'Missing executive alignment'] },
  { id: 'account-active', name: 'Account - Active', description: 'Ongoing commercial relationship', color: '#10B981', entryLogic: 'Onboarding complete; regular business reviews scheduled', exitLogic: 'Dormant (no activity 90+ days) or Blocked (compliance/payment issue)', userActions: ['Regular business reviews', 'Identify expansion opportunities', 'Monitor account health and NPS', 'Manage ongoing Opportunities and Quotes'], commonMistakes: ['Taking account for granted', 'No regular business reviews', 'Missing expansion signals'] },
  { id: 'opportunity-new', name: 'Opportunity - New', description: 'Initial commercial opportunity identified', color: '#14B8A6', entryLogic: 'Customer expresses interest in specific solution or deal', exitLogic: 'Pass qualification gates or mark as lost', userActions: ['Document opportunity details', 'Identify decision-making committee', 'Understand business case and timeline', 'Assess win probability'], commonMistakes: ['Opportunity created without business case', 'Wrong account linkage', 'No clear next steps'] },
  { id: 'opportunity-qualified', name: 'Opportunity - Qualified', description: 'Business case confirmed; ready for proposal', color: '#10B981', entryLogic: 'Business case validated; decision-makers confirmed; timeline defined', exitLogic: 'Quote created and sent', userActions: ['Finalize solution design', 'Confirm pricing and terms', 'Get internal approval if needed', 'Prepare Quote'], commonMistakes: ['Quote without confirmed budget', 'Skipping internal approval', 'Missing commercial terms discussion'] },
  { id: 'quote', name: 'Quote', description: 'Formal offer presented to customer', color: '#14B8A6', entryLogic: 'Opportunity qualified; terms agreed internally', exitLogic: 'Quote accepted (move to Contract) or lost', userActions: ['Send Quote to customer', 'Answer pricing/terms questions', 'Manage Quote version iterations', 'Track response timeline'], commonMistakes: ['Quote without clear approval path', 'Missing T&Cs or key terms', 'No quote version management'] },
  { id: 'contract', name: 'Contract', description: 'Legal agreement executed', color: '#10B981', entryLogic: 'Quote accepted; move to contract negotiation and execution', exitLogic: 'Contract signed (Closed Won) or deal lost', userActions: ['Finalize contract terms', 'Get legal review if needed', 'Route for customer signature', 'Get internal approvals'], commonMistakes: ['Treating Quote and Contract as the same', 'Missing compliance/legal review', 'No clear signature authority'] },
  { id: 'closed-won', name: 'Closed - Won', description: 'Deal successfully closed; customer onboarded', color: '#10B981', entryLogic: 'Contract signed and fulfilled', exitLogic: 'Transition to Account Active status', userActions: ['Complete deal documentation', 'Hand off to delivery/account management', 'Schedule customer kickoff', 'Log lessons learned'], commonMistakes: ['Closing without evidence (contract, payment)', 'No handoff process', 'Missing customer kickoff'] },
];

export default function LifecyclePage() {
  const [selectedStage, setSelectedStage] = useState<typeof stages[0] | null>(null);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] via-[#F0F4FF] to-[#FAFBFC]">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -right-40 w-80 h-80 bg-[#0056FF] rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-[#32E396] rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <Link href="/" className="text-[#0056FF] hover:text-[#0040CC] mb-8 inline-flex items-center font-bold transition-all">
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold text-[#1F2937] mb-4">The NxN Lifecycle</h1>
          <p className="text-lg text-[#4B5563] max-w-3xl">Explore each stage of the customer lifecycle journey and understand key activities, entry/exit logic, and common mistakes at every step.</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate="visible">
          {stages.map((stage) => (
            <motion.div key={stage.id} variants={itemVariants} whileHover={{ y: -6 }} onClick={() => setSelectedStage(stage)} className="cursor-pointer">
              <div className="h-full bg-white/80 backdrop-blur-sm border-2 border-[#E5E7EB] p-6 rounded-xl shadow-sm transition-all hover:border-[#0056FF] hover:shadow-lg group" style={{ borderLeftColor: stage.color, borderLeftWidth: '4px' }}>
                <div className="w-10 h-10 rounded-full mb-4 flex items-center justify-center text-white font-bold" style={{ backgroundColor: stage.color }}>📋</div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2 group-hover:text-[#0056FF] transition-colors">{stage.name}</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed mb-4">{stage.description}</p>
                <motion.div className="text-[#0056FF] font-bold text-sm flex items-center gap-2" whileHover={{ x: 4 }}>Explore</motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {selectedStage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedStage(null)} className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="w-12 h-12 rounded-full mb-3 flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: selectedStage.color }}>📋</div>
                    <h2 className="text-3xl font-bold text-[#1F2937]">{selectedStage.name}</h2>
                    <p className="text-[#4B5563] mt-2">{selectedStage.description}</p>
                  </div>
                  <button onClick={() => setSelectedStage(null)} className="text-[#6B7280] hover:text-[#1F2937] text-2xl">✕</button>
                </div>
                <div className="mb-6 p-4 bg-[#F0F9FF] border-l-4 border-[#0056FF] rounded">
                  <h3 className="font-bold text-[#0056FF] mb-2">Entry Logic</h3>
                  <p className="text-[#4B5563]">{selectedStage.entryLogic}</p>
                </div>
                <div className="mb-6 p-4 bg-[#F0F9FF] border-l-4 border-[#0056FF] rounded">
                  <h3 className="font-bold text-[#0056FF] mb-2">Exit Logic</h3>
                  <p className="text-[#4B5563]">{selectedStage.exitLogic}</p>
                </div>
                <div className="mb-6">
                  <h3 className="font-bold text-[#1F2937] mb-3">Key User Actions</h3>
                  <ul className="space-y-2">
                    {selectedStage.userActions.map((action, idx) => (
                      <li key={idx} className="flex gap-3 text-[#4B5563]">
                        <span className="text-[#0056FF] font-bold">✓</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6 p-4 bg-[#FEF3C7] border-l-4 border-[#EB861F] rounded">
                  <h3 className="font-bold text-[#B85D0B] mb-3">Common Mistakes</h3>
                  <ul className="space-y-2">
                    {selectedStage.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex gap-3 text-[#B85D0B]">
                        <span className="font-bold">!</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => setSelectedStage(null)} className="w-full px-6 py-3 bg-gradient-to-r from-[#0056FF] to-[#0040CC] text-white font-bold rounded-lg hover:shadow-lg transition-all">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
