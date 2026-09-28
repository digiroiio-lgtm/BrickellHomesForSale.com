// Buyer research prompts. Verify applicable documents and professional advice for each transaction.
export const buyerGuideContent: Record<string, {
  headline: string;
  intro: string;
  sections: { heading: string; text: string; checks: string[] }[];
  brief: string;
  related: { label: string; href: string }[];
}> = {
  'brickell-condo-closing-process': {
    headline: 'Build the closing calendar around actual deliverables.',
    intro: 'A Brickell condo closing involves a unit, an association and often a lender. The contract controls the dates; the association and financing teams supply information that can change whether those dates are realistic. Establish who orders each item and when it must arrive.',
    sections: [
      { heading: 'From contract to document review', text: 'Ask your agent and attorney to map contractual deadlines for the deposit, inspection, condominium documents and any financing contingency. Obtain the current association records and identify the person who can answer unit-specific questions.', checks: ['Record each deadline from the signed contract.', 'Confirm how association documents and approval requests will be delivered.', 'Ask counsel what review rights apply to this transaction.'] },
      { heading: 'Coordinate lender, insurance and title', text: 'A lender may need project information, a unit appraisal and acceptable insurance. Title and closing providers reconcile ownership, liens, assessments and prorations. Give all parties the same target date and track missing items rather than assuming an approval is complete.', checks: ['Ask the lender which project documents remain outstanding.', 'Confirm unit and association insurance requirements.', 'Review the title commitment and closing statement with the appropriate professional.'] },
      { heading: 'Check funds and handover', text: 'Review the final figures and documents before signing. Verify wiring instructions through a known phone number and clarify keys, access credentials and building move procedures in advance.', checks: ['Compare the Closing Disclosure or settlement statement with your expectations.', 'Confirm the final amount and payment instructions independently.', 'Arrange building access and any move reservation.'] }
    ],
    brief: 'Share your target closing date, financing plan and building so the transaction checklist can be tailored.',
    related: [{ label:'Closing costs',href:'/closing-costs/' },{ label:'Application and approval',href:'/brickell-condo-application-approval/' },{ label:'Condo document checklist',href:'/condo-documents/' }]
  },
  'brickell-condo-special-assessments': {
    headline: 'Separate an approved assessment from a future possibility.',
    intro: 'An assessment can change the true cost of a condo purchase. Its purpose, approval status, payment schedule and allocation to the unit matter more than a generic statement that the building has “no assessments.” Request dated records and confirm what the contract says about payments due before and after closing.',
    sections: [
      { heading: 'Find the source of the obligation', text: 'Review board minutes, notices, adopted budgets, reserve information and inspection or repair reports. A proposed project, board discussion and formally approved charge are distinct stages.', checks: ['Ask for all adopted and proposed assessment notices.', 'Read recent board minutes for capital work and insurance changes.', 'Confirm the unit’s share and the payment schedule in writing.'] },
      { heading: 'Compare reserves with planned work', text: 'Maintenance, statutory inspections and reserve funding can influence future costs. Obtain the most recent structural integrity reserve study when applicable, alongside the association budget and any project bids available for review.', checks: ['Match identified work to the adopted funding plan.', 'Ask whether financing or a payment plan is involved.', 'Review material uncertainty with an independent condo attorney or financial adviser.'] },
      { heading: 'Price the closing allocation', text: 'The purchase contract and applicable law govern how an assessment is allocated. Ask the closing team to show the exact calculation for this unit and confirm any remaining obligation after transfer.', checks: ['Have counsel review the assessment clause.', 'Request an estoppel or status statement as applicable.', 'Include future installments in your ownership budget.'] }
    ],
    brief: 'Name the building and your monthly budget so adopted charges and unresolved work can be reviewed in context.',
    related: [{label:'HOA fees and reserves',href:'/hoa-fees/'},{label:'Condo inspections',href:'/condo-inspections/'},{label:'Closing process',href:'/brickell-condo-closing-process/'}]
  },
  'brickell-condo-rental-restrictions': {
    headline: 'Prove the rental rights of the exact unit.',
    intro: 'Rental rules can differ by building, ownership status and date. A listing description is not a substitute for current governing documents. If rental income or a future move matters to your purchase, have the applicable restrictions reviewed before relying on a rental scenario.',
    sections: [
      { heading: 'Read the rule set together', text: 'Request the declaration, bylaws, current rules and amendments. Identify minimum lease terms, annual limits, application requirements, fees and any waiting period, and ask whether different provisions apply to existing owners.', checks: ['Confirm the minimum term and permitted frequency.', 'Check caps, waiting periods and any approval process.', 'Ask whether the specific unit has an exception or existing lease.'] },
      { heading: 'Test the intended use', text: 'Short stays and furnished leases may trigger additional city, county, association, lender and insurance conditions. Obtain independent advice for the intended use instead of extrapolating from a neighboring building.', checks: ['Describe the rental plan in exact terms.', 'Verify current association and local requirements.', 'Check financing and insurance terms before projecting revenue.'] },
      { heading: 'Put the answer into the purchase decision', text: 'Rules can be amended and actual rental performance is uncertain. Compare the purchase on its own carrying costs and retain copies of the documents used in the decision.', checks: ['Request dated written confirmation from the association.', 'Stress-test expenses without rental income.', 'Discuss legal interpretation with condo counsel.'] }
    ],
    brief: 'State your intended rental term, timing and target building so the relevant written restrictions can be requested.',
    related: [{label:'Condo documents',href:'/condo-documents/'},{label:'Brickell Key area',href:'/brickell-key/'},{label:'Building profiles',href:'/buildings/'}]
  },
  'brickell-condo-pet-rules': {
    headline: 'Match the written pet policy to your household.',
    intro: 'A building described as pet friendly may still have limits on number, size, registration or use of shared spaces. Rules can change. Review the current policy for the exact building and unit before assuming your pet or future plans are covered.',
    sections: [
      { heading: 'Identify the operative documents', text: 'Ask for the declaration, bylaws, current rules, amendments and any registration forms. A sales conversation alone does not establish the legal restrictions or what was grandfathered for a prior owner.', checks: ['Check number, size and type limits where stated.', 'Ask about registration, fees and common-area rules.', 'Confirm whether rules differ for tenants and owners.'] },
      { heading: 'Clarify exceptions carefully', text: 'Assistance-animal requests are governed by separate legal standards and should be handled with qualified advice. Do not infer eligibility or required documentation from a general pet-policy summary.', checks: ['Ask the association for its current written process.', 'Discuss any accommodation question with qualified counsel.', 'Keep dated written responses and the policy version reviewed.'] },
      { heading: 'Test daily life as well as eligibility', text: 'Visit entrances, elevators and outdoor routes with your routine in mind. Then verify the legal answer before committing to the unit.', checks: ['Walk the usual pet route.', 'Confirm move-in and elevator procedures.', 'Resolve any ambiguity before a contract deadline.'] }
    ],
    brief: 'Tell us the building and your pet needs so the current written policy can be requested and checked.',
    related: [{label:'Condo documents',href:'/condo-documents/'},{label:'Condo application',href:'/brickell-condo-application-approval/'},{label:'Building profiles',href:'/buildings/'}]
  },
  'brickell-condo-application-approval': {
    headline: 'Plan the association review before setting a closing date.',
    intro: 'Some condominium associations require a buyer package or approval before transfer or move-in. The documents determine the process; timelines and fees vary. Ask for the actual forms and written requirements early enough to protect the contract schedule.',
    sections: [
      { heading: 'Request the current package', text: 'Identify the managing contact and ask for all required forms, fees, identity or financing materials and submission instructions. Clarify whether an interview or board meeting is part of the process.', checks: ['Obtain dated application forms and the fee schedule.', 'Confirm who submits the package and whether originals are required.', 'Ask for the next available review or meeting dates.'] },
      { heading: 'Align the approval with the contract', text: 'Ask your agent and attorney to compare the expected review timeline with financing and closing deadlines. An incomplete application may delay approval; get a written acknowledgment of a complete submission.', checks: ['Track the submission and completeness confirmation.', 'Ask when a decision or certificate is expected.', 'Discuss contract contingencies and extensions with counsel.'] },
      { heading: 'Prepare for move-in', text: 'Approval to purchase and permission to move may be separate steps. Confirm deposits, elevator reservations, insurance certificates for movers and access procedures.', checks: ['Request the latest move-in rules.', 'Confirm reservation windows and deposits.', 'Retain approval and access documents for closing.'] }
    ],
    brief: 'Share your building and desired close date to identify the relevant approval steps and timing.',
    related: [{label:'Closing process',href:'/brickell-condo-closing-process/'},{label:'Condo documents',href:'/condo-documents/'},{label:'Pet rules',href:'/brickell-condo-pet-rules/'}]
  },
  'brickell-condo-mortgage-requirements': {
    headline: 'A condo loan evaluates the unit and the project.',
    intro: 'Preapproval for your finances does not establish that a particular condominium is eligible for the chosen loan. Lenders can review the association’s finances, insurance, litigation, ownership mix and inspection or repair information. Requirements depend on the lender and loan program.',
    sections: [
      { heading: 'Ask about project review at the outset', text: 'Share the building and legal unit with your lender before writing an offer. Ask which condo questionnaire and documents are needed and whether any known issue could affect the proposed loan.', checks: ['Confirm the loan program and condo review path.', 'Ask who orders the questionnaire and its turnaround time.', 'Request current budget, insurance and project records early.'] },
      { heading: 'Budget for cash and ongoing cost', text: 'Down payment, reserves, rates and any assessment can change affordability. Ask the lender for a transaction-specific Loan Estimate and check taxes, association charges and insurance with the proper providers.', checks: ['Compare proposed cash to close and monthly payment.', 'Clarify whether any assessment changes the loan review.', 'Verify the applicable insurance and reserve requirements.'] },
      { heading: 'Protect the offer timeline', text: 'Project eligibility and final underwriting may remain open after personal preapproval. Coordinate lender documents with the financing contingency, appraisal and association approval dates in the contract.', checks: ['Ask which approval conditions remain unresolved.', 'Track lender and association response dates.', 'Discuss financing contingency language with your agent and counsel.'] }
    ],
    brief: 'Share your loan program, down payment range and target building to ask the lender the right project questions.',
    related: [{label:'Cash versus financing',href:'/cash-vs-financing-brickell-condo/'},{label:'Closing process',href:'/brickell-condo-closing-process/'},{label:'HOA fees',href:'/hoa-fees/'}]
  },
  'cash-vs-financing-brickell-condo': {
    headline: 'Compare certainty, liquidity and the full cost.',
    intro: 'Cash and financing change more than the offer headline. Financing introduces lender and project review; cash ties up liquidity and still requires the buyer to investigate the building and unit. Compare both routes for the same residence and timeline.',
    sections: [
      { heading: 'Model two complete scenarios', text: 'For a financed purchase, include rate, loan fees, cash to close, insurance and monthly payment. For cash, include the opportunity cost of using funds and a reserve for future repairs or assessments. Taxes and association charges remain in both paths.', checks: ['Request a lender-specific Loan Estimate for financing.', 'Keep a realistic reserve after a cash purchase.', 'Compare the same unit and closing assumptions in both cases.'] },
      { heading: 'Check transaction certainty', text: 'A cash offer removes a loan contingency only if the contract says so; it does not remove title, association, inspection or legal issues. Financing adds project eligibility and appraisal steps that may affect timing.', checks: ['Verify proof of funds or loan readiness.', 'Ask the lender about the target building early.', 'Keep unit and association diligence in either route.'] },
      { heading: 'Choose terms for your actual goals', text: 'Price, contingencies and closing date can have different value to a seller. Ask your agent and independent advisers to weigh the offer structure against your liquidity and risk tolerance.', checks: ['Compare realistic closing calendars.', 'Discuss contract terms with counsel.', 'Avoid a cash commitment that exhausts your contingency reserve.'] }
    ],
    brief: 'Tell us your target building, budget and funding approach so the two transaction paths can be compared.',
    related: [{label:'Mortgage requirements',href:'/brickell-condo-mortgage-requirements/'},{label:'Closing costs',href:'/closing-costs/'},{label:'Condo assessment guide',href:'/brickell-condo-special-assessments/'}]
  }
};
