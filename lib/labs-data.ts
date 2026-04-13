export interface LabScenario {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  chapterId: string;
  scenario: {
    title: string;
    context: string;
    situation: string;
    question: string;
  };
  correctAnswer: string;
  bestAnswer?: string;
  explanation: string;
  keyLearnings: string[];
  assessmentType: 'scored' | 'feedback'; // 'scored' = quiz-style, 'feedback' = scenario with guidance
  scoringRubric?: {
    excellent: string;
    good: string;
    developing: string;
  };
}

export const LABS: Record<string, LabScenario> = {
  // Chapter 01: Why This Training Matters
  'lab-01-01': {
    id: 'lab-01-01',
    title: 'Applying Consistency Principle',
    difficulty: 'beginner',
    description: 'Identify how consistency benefits sales operations',
    chapterId: '01-why-matters',
    scenario: {
      title: 'Applying Consistency Principle',
      context: 'Your team has inconsistent lead qualification criteria across regions',
      situation: 'Sales reps in the East qualify leads with different standards than the West. Forecast accuracy is poor.',
      question: 'How does the Consistency principle help solve this problem?',
    },
    correctAnswer: 'Implement standardized qualification criteria across all regions. All reps follow the same process, terminology, and decision framework.',
    bestAnswer: 'Create a unified lead qualification checklist using the five-criteria framework (valid company, valid contact, defined need, defined budget, defined timeline). Train all regions and enforce via Salesforce workflows.',
    explanation: 'Consistency means every sales professional follows the same process. When criteria are standardized, forecast accuracy improves and scaling becomes possible.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Consistency enables scalability and training',
      'Standardized processes reduce regional variation',
      'Forecast accuracy improves with consistent qualification',
    ],
  },
  'lab-01-02': {
    id: 'lab-01-02',
    title: 'Governance and Control in Action',
    difficulty: 'intermediate',
    description: 'Apply control principles to prevent deal errors',
    chapterId: '01-why-matters',
    scenario: {
      title: 'Governance and Control in Action',
      context: 'A sales rep wants to offer a 60% discount to win a deal without approval',
      situation: 'The deal is worth $500K annually. Normal discount limit is 10%, requiring manager approval above 20%.',
      question: 'What control mechanism should prevent this? What do you do?',
    },
    correctAnswer: 'A pricing governance gate should block this. Require manager approval for any discount above 20%. Route the request through the approval workflow.',
    bestAnswer: 'Implement Salesforce workflow rules that prevent quote submission without proper approval based on discount level. Create an approval matrix and enforce it systematically.',
    explanation: 'Control includes governance checkpoints that prevent unauthorized commitments. Gates protect both the company and ensure consistent pricing.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Governance gates prevent unauthorized pricing',
      'Approval workflows enforce business rules',
      'Control protects company margins and consistency',
    ],
  },
  'lab-01-03': {
    id: 'lab-01-03',
    title: 'Achieving Visibility Through Data',
    difficulty: 'beginner',
    description: 'Understand how standardized data enables visibility',
    chapterId: '01-why-matters',
    scenario: {
      title: 'Achieving Visibility Through Data',
      context: 'Leadership cannot forecast next quarter revenue accurately',
      situation: 'Opportunities are in different stages but stages dont mean the same thing across regions.',
      question: 'How does Visibility through consistent process solve this?',
    },
    correctAnswer: 'Define consistent stage gates and probability weights. Ensure all reps capture required fields. With clean data, leadership can forecast using stage distribution and probabilities.',
    bestAnswer: 'Implement standardized opportunity stage definitions with specific gate requirements. Require field completion before stage moves. Build forecast reports based on stage probability.',
    explanation: 'Visibility comes from clean, consistent data. When everyone captures the same information the same way, leadership can see the true business picture.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Consistent data enables accurate forecasting',
      'Visibility requires discipline in data entry',
      'Clean pipeline data guides strategic decisions',
    ],
  },

  // Chapter 02: The Full Customer Journey
  'lab-02-01': {
    id: 'lab-02-01',
    title: 'Mapping a Deal Through Stages',
    difficulty: 'intermediate',
    description: 'Trace a prospect through the complete customer journey',
    chapterId: '02-customer-journey',
    scenario: {
      title: 'Mapping a Deal Through Stages',
      context: 'A prospect named Sarah from Acme Corp contacts you about platform consolidation',
      situation: 'You have: initial interest (inbound inquiry), confirmed need (50 users, three legacy systems), budget (yes, allocated), timeline (6 months).',
      question: 'Walk through the journey stages. What stage is this deal in, and what happens next?',
    },
    correctAnswer: 'This is in Verification/Qualification. Once qualified, Sarah\'s lead converts to Parent Account (Acme Corp) and Entity Child Account. Then an Opportunity is created and moves through Solution Definition → Pricing & Quotation → Customer Review → Contracting → Closed Won.',
    bestAnswer: 'After qualification: Create Parent Account for Acme Corp, create Entity Child Account for the platform division. Create Opportunity on Entity Child. Move through stages by gathering solution details → preparing quote → getting customer acceptance → finalizing contract.',
    explanation: 'Each stage of the customer journey requires specific activities and handoffs. Understanding the flow ensures nothing falls through cracks.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Journey flows from Lead → Verified → Qualified → Converted → Opportunity → Won',
      'Account hierarchy must be correct at conversion',
      'Each stage has specific activities and exit criteria',
    ],
  },
  'lab-02-02': {
    id: 'lab-02-02',
    title: 'Identifying Account Hierarchy Risks',
    difficulty: 'intermediate',
    description: 'Catch account structure problems early',
    chapterId: '02-customer-journey',
    scenario: {
      title: 'Identifying Account Hierarchy Risks',
      context: 'You are converting a lead. Company is Acme Financial Services with 3 offices',
      situation: 'The prospect works for the New York office managing their regional operations. You could create either a single Entity Child or multiple Entity Children by office.',
      question: 'Which approach is correct? Why does it matter?',
    },
    correctAnswer: 'If this prospect will service all 3 offices, use one Entity Child Account. If each office buys separately, create separate Entity Child Accounts. The structure affects how revenue is attributed.',
    bestAnswer: 'Ask the prospect: "Will this implementation serve all three offices or just New York?" If all offices, one Entity Child. If regional, separate Entity Children. This determines revenue attribution.',
    explanation: 'Wrong account hierarchy causes revenue misattribution. Know whether you\'re selling to the whole company or just one division before converting.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Hierarchy structure impacts revenue attribution',
      'Clarify account structure before conversion',
      'Multiple Entity Children are used for separate business units',
    ],
  },

  // Chapter 03: Roles in the Process
  'lab-03-01': {
    id: 'lab-03-01',
    title: 'Role Clarity in a Deal Handoff',
    difficulty: 'beginner',
    description: 'Understand role transitions during deal progression',
    chapterId: '03-roles',
    scenario: {
      title: 'Role Clarity in a Deal Handoff',
      context: 'A deal is closing. As sales rep, youve moved it through Contracting',
      situation: 'Contract is signed. Customer is ready to go live. Who owns the next phase?',
      question: 'Which role transitions in? What do they own?',
    },
    correctAnswer: 'The Account Manager takes over. They own onboarding, customer success, renewals, and expansion for the active customer.',
    bestAnswer: 'At Closed Won, transition to Account Manager (Customer Success). Sales rep responsibility ends; Account Manager now owns customer health, adoption, renewals, and expansion opportunities.',
    explanation: 'Clear role transitions prevent gaps. Sales reps close deals; Account Managers grow them.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Sales rep owns pre-closure; Account Manager owns post-closure',
      'Clear handoff prevents deal delays',
      'Each role has specific accountability',
    ],
  },
  'lab-03-02': {
    id: 'lab-03-02',
    title: 'Escalation and Approver Coordination',
    difficulty: 'intermediate',
    description: 'Identify when to escalate and who approves',
    chapterId: '03-roles',
    scenario: {
      title: 'Escalation and Approver Coordination',
      context: 'A major customer ($2M deal) requests non-standard contract terms',
      situation: 'Customer wants 50% of liability limitation and 180-day payment terms. Your normal limits are different.',
      question: 'Who reviews and approves these terms? Who escalates?',
    },
    correctAnswer: 'Sales Manager or Director reviews the request. Legal team reviews terms. Finance approves payment terms. Contract is not sent until all approve.',
    bestAnswer: 'Escalate to Sales Manager + Legal + Finance as a team. Document the business case for why non-standard terms are acceptable. Get documented approval before sending contract.',
    explanation: 'Non-standard terms require escalation and multi-function approval. Never send a contract with unapproved terms.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Non-standard terms require escalation',
      'Legal, Finance, and Sales must align',
      'Documentation of approvals protects the company',
    ],
  },

  // Chapter 04: Lead Management
  'lab-04-01': {
    id: 'lab-04-01',
    title: 'The Five Qualification Criteria',
    difficulty: 'beginner',
    description: 'Evaluate a lead against the five qualification criteria',
    chapterId: '04-lead-management',
    scenario: {
      title: 'The Five Qualification Criteria',
      context: 'You receive a lead from a prospect named Alex at ResourceCorp',
      situation: 'Company exists (verified website). Alex is Director of IT. Mentioned they\'ve discussed budgeting for software solutions "sometime next year." Hasnt specified a problem yet.',
      question: 'Which of the five criteria are met? Is this lead qualified?',
    },
    correctAnswer: 'Criteria met: Company Validity (yes), Contact Validity (yes, Director-level). Criteria NOT met: Defined Need (vague), Budget (tentative), Timeframe ("sometime next year" is not defined). NOT QUALIFIED - move to Nurture, not Qualification stage.',
    bestAnswer: 'Ask clarifying questions: "What specific business problem are you trying to solve?" "When exactly will you make a decision?" "Is budget confirmed?" Until all five criteria are confirmed, keep in Nurture.',
    explanation: 'The five-criteria framework prevents pursuing unqualified leads. Qualification must be proven, not assumed.',
    assessmentType: 'feedback',
    keyLearnings: [
      'All five criteria must be met to qualify',
      'Defined need, budget, and timeline are non-negotiable',
      'Nurture promising leads that arent yet qualified',
    ],
  },
  'lab-04-02': {
    id: 'lab-04-02',
    title: 'Duplicate Lead Detection',
    difficulty: 'beginner',
    description: 'Catch duplicates using lead matching',
    chapterId: '04-lead-management',
    scenario: {
      title: 'Duplicate Lead Detection',
      context: 'You create a new lead for a prospect from "Acme Financial Services"',
      situation: 'Salesforce flags a matching alert: "acme-financial-services-account" exists. Contact Sarah Chen (sarah@acmefinancial.com) is already in the system with an open opportunity for $1.2M.',
      question: 'What do you do? Is this a duplicate or a new lead?',
    },
    correctAnswer: 'This is a DUPLICATE. The contact and company already exist. You should merge this lead with the existing contact/account, not create a new record.',
    bestAnswer: 'Click "Merge" and link this lead to the existing Acme account and Sarah contact. This prevents duplicate sales effort and keeps the database clean.',
    explanation: 'Lead matching at entry prevents duplicates from polluting the system. Always review and respond to duplicate alerts.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Review duplicate matching alerts before saving leads',
      'Duplicates waste sales effort and break reporting',
      'Merging leads consolidates activity on one record',
    ],
  },
  'lab-04-03': {
    id: 'lab-04-03',
    title: 'Lead Assignment Rules in Action',
    difficulty: 'intermediate',
    description: 'Understand how assignment rules route leads',
    chapterId: '04-lead-management',
    scenario: {
      title: 'Lead Assignment Rules in Action',
      context: 'Your company has assignment rules: Financial Services + East Region → Maria (banking specialist)',
      situation: 'A new lead comes in from Bank of Boston (Financial Services, Boston headquarters).',
      question: 'Who should this lead be assigned to? Why does assignment matter?',
    },
    correctAnswer: 'This lead auto-assigns to Maria because it matches Financial Services + East Region. Maria has expertise in banking and is best positioned to pursue this lead.',
    bestAnswer: 'Assignment rules route leads to the rep with right expertise + geography. Maria gets this lead, improves likelihood of good qualification and faster sales cycle.',
    explanation: 'Good assignment rules get leads to the best rep. Poor assignment wastes opportunity.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Assignment rules route leads to specialist reps',
      'Industry + geography + language are common assignment criteria',
      'Right assignment improves qualification and close rates',
    ],
  },

  // Chapter 05: Conversion and Hierarchy
  'lab-05-01': {
    id: 'lab-05-01',
    title: 'Net-New vs. Existing Account Detection',
    difficulty: 'intermediate',
    description: 'Determine correct conversion scenario',
    chapterId: '05-conversion-hierarchy',
    scenario: {
      title: 'Net-New vs. Existing Account Detection',
      context: 'You have two conversion scenarios today',
      situation: 'Lead 1: GlobalTech Industries (new company, no existing Salesforce record). Lead 2: GlobalTech Industries, different division (parent company exists).',
      question: 'How does conversion differ between these two?',
    },
    correctAnswer: 'Lead 1 (Net-New): Create new Parent Account and new Entity Child Account. Lead 2 (Existing Parent): Link to existing Parent, create new Entity Child for this division.',
    bestAnswer: 'Lead 1 conversion creates two new accounts. Lead 2 conversion links to existing parent and creates a new child. Different structure, same company, different business units.',
    explanation: 'Conversion scenarios determine hierarchy. Getting it right prevents duplicates and ensures clean revenue attribution.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Net-new converts to new Parent + new Entity Child',
      'Existing account converts to same Parent + new Entity Child',
      'Conversion logic prevents duplicates and ensures hierarchy correctness',
    ],
  },
  'lab-05-02': {
    id: 'lab-05-02',
    title: 'Managing Partner-Led Conversions',
    difficulty: 'advanced',
    description: 'Handle partner/reseller account conversions',
    chapterId: '05-conversion-hierarchy',
    scenario: {
      title: 'Managing Partner-Led Conversions',
      context: 'TechPartner reseller is selling your solution to EndCustomer Corp',
      situation: 'You have: Partner account (TechPartner) already in system. End customer (EndCustomer Corp) is new to your system.',
      question: 'How do you structure the account hierarchy for this partner-led opportunity?',
    },
    correctAnswer: 'Create Parent Account for EndCustomer Corp and Entity Child for their implementation. Link both to TechPartner as the reseller/partner. This tracks both the end customer and the reseller relationship.',
    bestAnswer: 'Parent: EndCustomer Corp | Entity Child: EndCustomer implementation | Partner: TechPartner (linked) | Opportunity on Entity Child, owned by Partner but linked to your account.',
    explanation: 'Partner-led deals require tracking both the end customer and the partner relationship. Hierarchy must reflect both.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Partner-led conversions track both partner and end customer',
      'Hierarchy clarifies who pays vs. who uses vs. who sells',
      'Reseller relationships are tracked separately from customer relationships',
    ],
  },

  // Chapter 06: Account Lifecycle
  'lab-06-01': {
    id: 'lab-06-01',
    title: 'Moving Account Through Lifecycle Stages',
    difficulty: 'intermediate',
    description: 'Understand when and why accounts move between stages',
    chapterId: '06-account-lifecycle',
    scenario: {
      title: 'Moving Account Through Lifecycle Stages',
      context: 'GlobalTech Corp account. Opportunity closed won 2 months ago. Contract signed, payment received.',
      situation: 'Customer is in initial setup phase. Have not gone live yet. Team is training users. Go-live target is 4 weeks.',
      question: 'What is the correct account lifecycle stage? Why?',
    },
    correctAnswer: 'ONBOARDING. Customer is post-contract but pre-go-live. Once they go live and are actively consuming, move to ACTIVE.',
    bestAnswer: 'Onboarding is the transition stage between sale and customer. Customer Success owns this phase until go-live. Move to Active once customer confirms go-live and usage metrics show adoption.',
    explanation: 'Onboarding stage signals that a deal has closed and customer is being transitioned. Active stage signals a paying customer generating revenue.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Onboarding is post-contract, pre-go-live',
      'Active means customer is paying and consuming',
      'Stage movements trigger different business processes',
    ],
  },
  'lab-06-02': {
    id: 'lab-06-02',
    title: 'Handling Blocked Account Resolution',
    difficulty: 'advanced',
    description: 'Manage and resolve blocked accounts',
    chapterId: '06-account-lifecycle',
    scenario: {
      title: 'Handling Blocked Account Resolution',
      context: 'ActiveCustomer Inc. has an unpaid invoice from 90 days ago for $50K',
      situation: 'Account was moved to BLOCKED. Finance has tried reaching them with no response. No new orders can be placed while Blocked.',
      question: 'What actions should be taken to resolve this and get account back to Active?',
    },
    correctAnswer: 'Escalate to Account Manager + Finance + potentially Legal. Make direct contact with customer CFO to understand issue. Arrange payment plan or resolve the underlying problem. Once resolved, move account back to ACTIVE.',
    bestAnswer: 'Account Manager should own the customer relationship. Finance should document the issue. Set up a meeting with customer finance leadership. Resolve payment or underlying issue. Once resolved and confirmed, move back to Active.',
    explanation: 'Blocked accounts require escalation and resolution. Until resolved, customer cannot move forward.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Blocked status requires immediate escalation',
      'Resolution requires customer engagement',
      'Move back to Active only after confirmation of resolution',
    ],
  },

  // Chapter 07: Opportunity Management
  'lab-07-01': {
    id: 'lab-07-01',
    title: 'Entity Child Account for Opportunities',
    difficulty: 'beginner',
    description: 'Understand why opportunities go on Entity Child, not Parent',
    chapterId: '07-opportunity-management',
    scenario: {
      title: 'Entity Child Account for Opportunities',
      context: 'You have a Parent Account: GiantCorp (parent holding company) with two divisions',
      situation: 'Entity Child 1: GiantCorp-USA (USA division) | Entity Child 2: GiantCorp-EMEA (Europe division). Opportunity is for USA division only.',
      question: 'On which account should you create the opportunity? Why does this matter?',
    },
    correctAnswer: 'Create opportunity on Entity Child 1 (GiantCorp-USA). This ensures revenue is attributed to the correct division. If created on Parent, revenue attribution is unclear.',
    bestAnswer: 'RULE: All opportunities on Entity Child Account only. This ensures revenue reporting shows which division/business unit generated the deal.',
    explanation: 'Opportunities on Parent Account make revenue attribution impossible. Entity Child creates clear accountability.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Opportunities MUST be on Entity Child Account, never Parent',
      'Entity Child placement ensures correct revenue attribution',
      'Wrong account placement breaks reporting',
    ],
  },
  'lab-07-02': {
    id: 'lab-07-02',
    title: 'Opportunity Stage Progression',
    difficulty: 'intermediate',
    description: 'Move opportunity through correct stages with activities',
    chapterId: '07-opportunity-management',
    scenario: {
      title: 'Opportunity Stage Progression',
      context: 'You have an opportunity in Qualification stage: "Acme - Platform Implementation - $1.2M"',
      situation: 'You\'ve had one discovery call. Customer is interested. You need to move the opportunity forward.',
      question: 'When can you move to Solution Definition? What activities must happen first?',
    },
    correctAnswer: 'Move to Solution Definition when: Primary Contact is confirmed, Next Steps are defined, and customer has confirmed general interest in proceeding. Schedule a technical deep-dive.',
    bestAnswer: 'Gate before moving: (1) Named primary contact, (2) Customer commitment to continue, (3) Scheduled next meeting/discovery. Then move to Solution Definition stage.',
    explanation: 'Stage movements should be gated. Don\'t advance without meeting gate criteria.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Each stage has entry gates that must be met',
      'Gate criteria ensure opportunity maturity before advancing',
      'Probability should increase as stage increases (more information gathered)',
    ],
  },

  // Chapter 08: Stage Gates
  'lab-08-01': {
    id: 'lab-08-01',
    title: 'Validating Stage Gate Readiness',
    difficulty: 'intermediate',
    description: 'Check if opportunity meets gates before advancing',
    chapterId: '08-stage-gates',
    scenario: {
      title: 'Validating Stage Gate Readiness',
      context: 'Opportunity is in Pricing & Quotation stage. Customer says they\'re ready for a quote.',
      situation: 'Your checklist: Products (yes, defined), Pricing basis (yes, per-user), Scope (partially defined, some unknowns), Customer expectations (partially set).',
      question: 'Are you ready to send a quote? What gates are missing?',
    },
    correctAnswer: 'NO. Scope is not locked and customer expectations are not fully set. If you send a quote now, it will likely need revision. Wait until scope and expectations are 100% locked.',
    bestAnswer: 'Gate check FAILS: "Scope Locked" and "Customer Expectations Set" are not 100% complete. Schedule another call to nail these down before preparing the quote. Moving forward will waste time.',
    explanation: 'Stage gates prevent wasted effort. Complete the gate before advancing.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Verify gates are met before stage movement',
      'Incomplete gates lead to rework and delay',
      'Exception approvals require documented management sign-off',
    ],
  },
  'lab-08-02': {
    id: 'lab-08-02',
    title: 'Exception Management and Documentation',
    difficulty: 'advanced',
    description: 'Request exception when gate cannot be met',
    chapterId: '08-stage-gates',
    scenario: {
      title: 'Exception Management and Documentation',
      context: 'You want to move opportunity to Contracting but Primary Contact has not been confirmed',
      situation: 'Customer said they\'d introduce you to the decision maker "next week." You want to move forward now to show progress.',
      question: 'Should you request an exception? If yes, how should you handle it?',
    },
    correctAnswer: 'You can request an exception from your manager BUT document why (e.g., "Customer timeline pressure"). Once exception is approved, immediately follow up to confirm Primary Contact. Do not skip the confirmation.',
    bestAnswer: 'Never skip gates entirely. If you request an exception: (1) Get manager approval in writing, (2) Document the business case, (3) Commit to closing the gap immediately. Then act.',
    explanation: 'Exceptions exist for urgent situations but require documentation and commitment to close the gap.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Exceptions require manager approval and documentation',
      'Business case must justify the exception',
      'Committed timeline to close the gate must be documented',
    ],
  },

  // Chapter 09: Quote Management
  'lab-09-01': {
    id: 'lab-09-01',
    title: 'Quote Creation and Approval Flow',
    difficulty: 'intermediate',
    description: 'Prepare and approve a quote properly',
    chapterId: '09-quote-management',
    scenario: {
      title: 'Quote Creation and Approval Flow',
      context: 'You are preparing a quote for TechCorp. Scope: 50 users @ $20K/user/year + $100K implementation.',
      situation: 'Total: $1.1M Year 1. Standard discount limit is 10% (requires manager approval above that). No special discounts are needed.',
      question: 'What approval is needed before sending to customer?',
    },
    correctAnswer: 'Pricing Approver reviews the quote (pricing is within standard terms). Quote is marked APPROVED and sent to customer. No additional approvals needed since discount is within limits.',
    bestAnswer: 'Pricing Approver confirms standard pricing and no discounts are out of policy. Route through approval workflow. Once approved, send formal PDF to customer.',
    explanation: 'Quotes must be approved before sending. Approval protects against pricing errors and unauthorized commitments.',
    assessmentType: 'feedback',
    keyLearnings: [
      'All quotes require approval before customer delivery',
      'Discount limits determine approval authority needed',
      'Approval documents create audit trail',
    ],
  },
  'lab-09-02': {
    id: 'lab-09-02',
    title: 'Quote Versioning During Negotiation',
    difficulty: 'intermediate',
    description: 'Manage quote versions as customer negotiates',
    chapterId: '09-quote-management',
    scenario: {
      title: 'Quote Versioning During Negotiation',
      context: 'Version 1 quote sent ($1.1M Year 1). Customer requests: lower per-user price and annual payment discount.',
      situation: 'You propose Version 2: $18K per user (3% reduction), 5% additional discount for annual upfront = $1.01M. Needs re-approval.',
      question: 'How should you manage versions?',
    },
    correctAnswer: 'Create Quote Version 2 with new pricing. Route to Pricing Approver for re-approval. Mark Version 1 as "Superseded." Send Version 2 to customer.',
    bestAnswer: 'Do NOT edit Version 1. Create Version 2 as a new record. Approval workflow re-runs for Version 2. Version 1 is marked Superseded. This creates clear audit trail.',
    explanation: 'Versioning creates clear audit trail and prevents confusion about what was proposed when.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Create new version rather than edit original',
      'Mark superseded versions clearly',
      'Version control enables audit trail and negotiations transparency',
    ],
  },

  // Chapter 10: Contract Management
  'lab-10-01': {
    id: 'lab-10-01',
    title: 'Contract Readiness and Legal Review',
    difficulty: 'intermediate',
    description: 'Prepare contract for legal review',
    chapterId: '10-contract-management',
    scenario: {
      title: 'Contract Readiness and Legal Review',
      context: 'Quote is accepted by customer. Ready to draft contract (SOW + MSA).',
      situation: 'Customer requested: 90-day payment terms (we normally do net 30), 2x liability cap (we normally cap at 1x). What happens next?',
      question: 'Should you send this contract to customer as-is? What must happen first?',
    },
    correctAnswer: 'NO. Non-standard terms must be reviewed by Legal first. Route to Legal: they review payment terms (Finance must approve), review liability cap (Legal approval), and provide guidance. Then send approved contract.',
    bestAnswer: 'Create contract draft with requested terms. Route to Legal + Finance for review. Get documented approvals for non-standard terms. Then mark contract as APPROVED and send to customer.',
    explanation: 'Non-standard terms require escalation and approval before customer sees them.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Contracts require Legal review before customer delivery',
      'Non-standard terms need multi-function approval',
      'Payment terms and liability caps require specific approvals',
    ],
  },
  'lab-10-02': {
    id: 'lab-10-02',
    title: 'Contract Execution and Status Tracking',
    difficulty: 'beginner',
    description: 'Track contract through execution',
    chapterId: '10-contract-management',
    scenario: {
      title: 'Contract Execution and Status Tracking',
      context: 'Contract has been negotiated and is ready for signature.',
      situation: 'Both NxN and customer have identified their authorized signatories. Contract is ready to be signed.',
      question: 'What status should the contract have? When can the opportunity close as Won?',
    },
    correctAnswer: 'Contract status: "Execution Pending" or "Ready for Signature". Move to "Executed" only AFTER both parties have signed. THEN close opportunity as Won.',
    bestAnswer: 'Opportunity closes as Won ONLY when contract is fully executed (signed by authorized signatories from both sides). Use contract execution date as the Won date.',
    explanation: 'Opportunity closure and contract execution are separate but linked. Won happens when contract is signed.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Contract status reflects legal lifecycle',
      'Opportunity closes Won only when contract is executed',
      'Signature authority must be validated',
    ],
  },

  // Chapter 11: Data Quality, Duplicates, and Governance
  'lab-11-01': {
    id: 'lab-11-01',
    title: 'Identifying and Merging Duplicate Accounts',
    difficulty: 'intermediate',
    description: 'Find and resolve duplicate accounts',
    chapterId: '11-data-quality',
    scenario: {
      title: 'Identifying and Merging Duplicate Accounts',
      context: 'Duplicate detection identifies two accounts: "Acme Corp" and "Acme Corporation"',
      situation: 'Both are the same company. Acme Corp has 1 opportunity ($500K). Acme Corporation has 1 opportunity ($300K).',
      question: 'Should you merge? Which is the primary? How do you handle the opportunities?',
    },
    correctAnswer: 'YES, merge. Choose Acme Corp as primary (or whichever has more recent activity). Both opportunities are reassigned to primary account. Acme Corporation is deleted.',
    bestAnswer: 'Verify both records are truly the same company. Choose most-used record as primary. Merge. Both opportunities move to primary account. Sales reps are notified.',
    explanation: 'Duplicate merging consolidates activity and cleans reporting.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Duplicate detection flags similar records',
      'Merge decisions require verification',
      'Related records reassign to primary during merge',
    ],
  },
  'lab-11-02': {
    id: 'lab-11-02',
    title: 'Field Completion and Data Quality Standards',
    difficulty: 'beginner',
    description: 'Ensure records have required data',
    chapterId: '11-data-quality',
    scenario: {
      title: 'Field Completion and Data Quality Standards',
      context: 'You review a sales rep\'s leads. Find: 20% have no phone number, 15% have no company size, 10% have no industry.',
      situation: 'These missing fields prevent proper assignment and qualification decisions.',
      question: 'What data governance action should you take?',
    },
    correctAnswer: 'Audit data quality trends. Coach rep on required field completion. Consider validation rules to prevent saving records without required fields. Track improvement.',
    bestAnswer: 'Make phone number, company size, and industry REQUIRED fields. Route incomplete records back to rep for completion. Track data quality metrics monthly.',
    explanation: 'Data governance includes field completion standards and accountability.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Identify required fields per record type',
      'Enforce field completion via validation rules',
      'Monitor and coach on data quality',
    ],
  },

  // Chapter 12: Reporting
  'lab-12-01': {
    id: 'lab-12-01',
    title: 'Pipeline Analysis and Forecasting',
    difficulty: 'intermediate',
    description: 'Analyze pipeline by stage for accurate forecast',
    chapterId: '12-reporting',
    scenario: {
      title: 'Pipeline Analysis and Forecasting',
      context: 'Your pipeline snapshot: Qualification $3M (20% prob), Solution Def $2M (40% prob), Pricing $1.5M (60% prob), Contracting $800K (90% prob)',
      situation: 'You need to forecast revenue for next quarter.',
      question: 'What is your probability-weighted forecast?',
    },
    correctAnswer: 'Forecast = ($3M × 20%) + ($2M × 40%) + ($1.5M × 60%) + ($800K × 90%) = $600K + $800K + $900K + $720K = $3.02M weighted forecast',
    bestAnswer: 'Apply stage probability to each opportunity bucket. Sum weighted amounts. This accounts for deal maturity at each stage.',
    explanation: 'Probability weighting converts raw pipeline to realistic forecast.',
    assessmentType: 'scored',
    scoringRubric: {
      excellent: 'Correctly calculated $3.02M forecast with clear methodology',
      good: 'Calculated forecast between $2.8M-$3.2M showing understanding of probability weighting',
      developing: 'Forecast outside range or used wrong probabilities',
    },
    keyLearnings: [
      'Probability-weighted forecast accounts for stage maturity',
      'Stage probabilities should be consistent company-wide',
      'Pipeline visibility enables accurate forecasting',
    ],
  },
  'lab-12-02': {
    id: 'lab-12-02',
    title: 'Win/Loss Analysis and Competitive Insights',
    difficulty: 'intermediate',
    description: 'Extract insights from closed deals',
    chapterId: '12-reporting',
    scenario: {
      title: 'Win/Loss Analysis and Competitive Insights',
      context: 'You review closed deals for the month: 5 won, 3 lost',
      situation: 'Won: 4 due to "superior solution fit," 1 due to "relationship strength". Lost: 2 due to "competitor selected," 1 due to "budget cut".',
      question: 'What insights should drive strategy?',
    },
    correctAnswer: 'Strength: Sales team is winning on solution fit (competitive advantage). Risk: Losing deals to specific competitors (need competitive differentiation). External factor: Some losses due to budget cuts (not controllable).',
    bestAnswer: 'Insight 1: Solution fit is working—reinforce this. Insight 2: Losing 2 deals to competitor—why? Get customer feedback. Insight 3: 1 budget loss is external.',
    explanation: 'Win/loss analysis reveals competitive positioning and sales effectiveness.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Document reason for every closed opportunity',
      'Win/loss analysis reveals competitive gaps',
      'Customer feedback on losses is invaluable for strategy',
    ],
  },

  // Chapter 13: Full-Cycle Simulation
  'lab-13-01': {
    id: 'lab-13-01',
    title: 'End-to-End Deal Walkthrough',
    difficulty: 'advanced',
    description: 'Execute all stages of a complete deal',
    chapterId: '13-full-cycle-simulation',
    scenario: {
      title: 'End-to-End Deal Walkthrough',
      context: 'You have a new lead: ABC Tech (100 employees, Manufacturing, Midwest)',
      situation: 'Task: Take this lead through the complete journey to Active customer. Describe the stages, roles, and activities.',
      question: 'Walk through the complete deal cycle. What happens at each stage?',
    },
    correctAnswer: 'Lead (verify) → Qualified → Parent/Entity Child created → Opportunity in Qualification → Solution Def → Pricing/Quote → Customer Review → Contracting → Won → Onboarding → Active. Each stage has activities, gates, and role transitions.',
    bestAnswer: 'Lead verification (you verify company/contact). Qualification (confirm 5 criteria). Conversion (create proper hierarchy). Opportunity creation (on Entity Child). Progress through stages with gating. Quote approval. Contract negotiation. Win. Account Manager takes over. Onboarding activities. Go-live. Move to Active.',
    explanation: 'The full cycle shows how all pieces work together.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Lead discipline is foundation of entire process',
      'Each stage has entry gates and exit activities',
      'Role transitions occur at key points (Won, Onboarding)',
    ],
  },
  'lab-13-02': {
    id: 'lab-13-02',
    title: 'Handling Multi-Stage Deal Complexity',
    difficulty: 'advanced',
    description: 'Manage complex multi-stakeholder deals',
    chapterId: '13-full-cycle-simulation',
    scenario: {
      title: 'Handling Multi-Stage Deal Complexity',
      context: 'Mid-market deal with multiple stakeholders: Sales champion (Director), IT gatekeeper, Finance approver, 3 executive sponsors',
      situation: 'Each stakeholder has different priorities. Timeline is compressed (decision in 6 weeks).',
      question: 'How do you navigate this complexity? What risks exist?',
    },
    correctAnswer: 'Risk: Consensus required; any stakeholder can kill deal. Mitigation: Map stakeholders, understand each priority, align primary champion, get executive sponsorship, move deal faster by removing discovery cycles.',
    bestAnswer: 'Stakeholder map + business case aligned to each stakeholder\'s goals + executive sponsorship + compressed timeline management + escalation plan for deadlock.',
    explanation: 'Complex deals require stakeholder navigation and risk mitigation.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Multi-stakeholder deals require stakeholder mapping',
      'Each stakeholder has different priorities and gates',
      'Executive sponsorship is critical in complex deals',
    ],
  },

  // Chapter 14: Common Mistakes
  'lab-14-01': {
    id: 'lab-14-01',
    title: 'Avoiding Common Qualification Mistakes',
    difficulty: 'intermediate',
    description: 'Recognize and avoid qualification shortcuts',
    chapterId: '14-common-mistakes',
    scenario: {
      title: 'Avoiding Common Qualification Mistakes',
      context: 'You receive an inbound lead. You know the company (Fortune 500). You want to skip verification and go straight to qualification.',
      situation: 'You think: "I know this company; I can skip verification." You want to move fast and create an opportunity immediately.',
      question: 'What mistake are you about to make? What should you do instead?',
    },
    correctAnswer: 'MISTAKE: Skipping verification. Even with well-known companies, contact validity, need, budget, and timeline must be confirmed. Spend 30 minutes verifying; avoid wasting weeks pursuing unqualified leads.',
    bestAnswer: 'Always verify: Is the contact real? Do they have authority? Is there a specific need and timeline? Only then qualify. Verification is the foundation.',
    explanation: 'Verification prevents pursuing invalid leads. Never skip it, even for known companies.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Verification cannot be skipped regardless of company size',
      'Verification is quick and saves weeks of wasted effort',
      'All five qualification criteria must be met',
    ],
  },
  'lab-14-02': {
    id: 'lab-14-02',
    title: 'Protecting Data Quality and Revenue Attribution',
    difficulty: 'advanced',
    description: 'Avoid critical system integrity mistakes',
    chapterId: '14-common-mistakes',
    scenario: {
      title: 'Protecting Data Quality and Revenue Attribution',
      context: 'You have three temptations: (1) Create opportunity directly on Parent Account, (2) Send quote without approval, (3) Close deal as Won without signed contract.',
      situation: 'Pressure to show progress and close deals fast.',
      question: 'Which of these three should you NEVER do? Why?',
    },
    correctAnswer: 'NEVER (1) Create on Parent—breaks revenue attribution. NEVER (2) Send unapproved quote—pricing errors, unauthorized discounts. NEVER (3) Close without signature—no legal commitment.',
    bestAnswer: 'Entity Child is mandatory for opportunities. Quote approval protects pricing. Contract signature protects legality. These are non-negotiable regardless of pressure.',
    explanation: 'These mistakes protect the company and enable accurate reporting.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Entity Child placement is mandatory for opportunities',
      'Quote approval is non-negotiable',
      'Contract signature is required before closing Won',
    ],
  },
  'lab-14-03': {
    id: 'lab-14-03',
    title: 'The Golden Rules - Final Assessment',
    difficulty: 'beginner',
    description: 'Commit to the golden rules of the process',
    chapterId: '14-common-mistakes',
    scenario: {
      title: 'The Golden Rules - Final Assessment',
      context: 'Scenario 1: New prospect. Scenario 2: Opportunity moving to next stage. Scenario 3: Customer responding to RFP.',
      situation: 'For each scenario, there is a right way and a shortcut.',
      question: 'Identify the right approach using Golden Rules',
    },
    correctAnswer: 'Scenario 1 (new prospect): Golden Rule 1 - Start with Lead. Verify, qualify, convert. Scenario 2 (opportunity stage move): Golden Rule 6 - Respect gates. Meet criteria before moving. Scenario 3 (RFP): Golden Rule 2 - Quote needs approval before sending.',
    bestAnswer: 'Memorize and commit to the seven golden rules: Start with Lead | Qualify with Evidence | Convert Correctly | Sell on Entity Child | One Opp per Bucket | Quote vs. Contract | Keep Data Clean',
    explanation: 'The golden rules are the foundation of process integrity.',
    assessmentType: 'feedback',
    keyLearnings: [
      'Seven golden rules ensure process integrity',
      'Every decision can be guided by golden rules',
      'Committing to rules protects company and enables scaling',
    ],
  },
};

export function getLabById(id: string): LabScenario | undefined {
  return LABS[id];
}

export function getLabsByChapter(chapterId: string): LabScenario[] {
  return Object.values(LABS).filter((lab) => lab.chapterId === chapterId);
}
