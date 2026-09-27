type Section = { heading: string; body: string };
type Detail = { sections: [Section, Section, Section]; ask: string; sources?: ('loan' | 'hoa' | 'transit' | 'insurance')[] };

// Original buyer decision guidance. No unit inventory, price claims or building policies.
export const supplementaryContent: Record<string, Detail> = {
  'best-condos-in-brickell': {
    sections: [
      { heading: 'Build a shortlist around how you will use the condo', body: 'For a primary home, write down the commute you will repeat, the bedrooms you will use and the monthly payment you can carry. For a second home, add arrival, parking, storage and the cost of keeping a unit empty. For an investment, start with the building’s written rental rules and a conservative cost model. A building can work well for one buyer and poorly for another.' },
      { heading: 'Compare buildings on the same terms', body: 'Ask for the current association budget, reserve study, inspection information and assessment notices for each candidate. Compare what the monthly dues cover and whether parking, storage or services cost extra. Then tour an actual unit to check its light, noise, layout and views. A building’s amenities or name cannot confirm the condition or rights of a particular condo.' },
      { heading: 'Use a short decision rule', body: 'Keep three must-haves and three deal breakers. If a building fails a must-have, remove it before spending time on unit photos. If it passes, ask whether a unit that meets your budget and timeline is actually available. Check current terms with the seller and association before treating any option as suitable.' }
    ],
    ask: 'Share your budget, use case and three must-haves to narrow the building comparison.'
  },
  'buying-a-condo-in-brickell': {
    sections: [
      { heading: 'Set the all-in budget before requesting units', body: 'Put your down payment or cash budget beside expected closing funds, taxes, insurance and HOA dues. If financing, ask a lender to review both your borrower profile and the kinds of condo buildings you may buy in. Your comfortable monthly limit can be more useful than your maximum purchase price.' },
      { heading: 'Tour the unit, then request the building records', body: 'Check the actual floor plan, exposure, condition and parking rights. Request the declaration, rules, budget, reserves, applicable inspection information, assessments and insurance summary. Ask which documents are current and which still need to be supplied. Record the questions you cannot resolve from a tour.' },
      { heading: 'Track the contract and closing', body: 'Before signing, have your agent and independent advisers explain the contract, deadlines, financing and inspection options. Ask your closing professional for an itemized estimate. If you finance the purchase, compare the Closing Disclosure with earlier lender estimates and raise differences before closing. The exact process depends on your contract.' }
    ],
    ask: 'Tell us your budget, financing plan and whether you are researching, touring or ready to offer.',
    sources: ['loan', 'hoa']
  },
  'brickell-key-vs-brickell': {
    sections: [
      { heading: 'Test access as part of the home', body: 'Start a typical workday from an actual Brickell Key address and a mainland address you might buy. Time the bridge crossing, a grocery run, a walk and an evening return. Repeat at the hours you will actually travel. A short distance on a map does not describe the door-to-door routine.' },
      { heading: 'Match buildings rather than area labels', body: 'Choose a comparable unit size and ownership budget on each side. Put the association fee, insurance, potential assessments, parking rights and written building rules next to the price. Check the specific view and noise from the unit. Island location by itself does not establish privacy, lower costs or rental eligibility.' },
      { heading: 'Choose the tradeoff you will live with', body: 'If you want daily walking access to mainland destinations, test those trips from the island. If a more separated setting matters, visit both areas at the same time of day. Review the address-level flood map and obtain unit-specific insurance information before your final comparison.' }
    ],
    ask: 'Tell us the trips you make weekly and which buildings you are comparing.',
    sources: ['transit', 'insurance']
  },
  'brickell-condos-2m-plus': {
    sections: [
      { heading: 'Price the actual living space', body: 'Compare usable interior space and the floor plan with how you live, not only the bedroom count or a headline area figure. Walk the exact line and floor for views, exposure, elevator access and privacy. Check whether adjacent parcels or shared areas affect the experience you are paying for.' },
      { heading: 'Confirm what transfers with the unit', body: 'Ask for the legal description and written evidence of parking, storage, terrace and any exclusive-use rights. Find out which services are included in dues and which incur separate charges. A tour or marketing brochure cannot settle ownership or maintenance responsibility for a roof deck or terrace.' },
      { heading: 'Examine the building’s obligations', body: 'Review the current budget, reserves, inspection records, insurance and planned projects. Ask about assessments and how the association expects to fund upcoming work. A higher purchase price can coexist with major building liabilities, so compare the total recurring and potential costs before deciding.' }
    ],
    ask: 'Share the space, view, privacy and service requirements that justify your budget.',
    sources: ['hoa']
  },
  'condo-reserves': {
    sections: [
      { heading: 'Read three records together', body: 'The reserve study describes planned major components and funding assumptions. The adopted budget shows current collections. Assessment notices and minutes reveal particular funding decisions. Request the most recent versions and ask whether the board has adopted the study’s recommendations or changed its funding approach.' },
      { heading: 'Connect work to a payment plan', body: 'If a roof, structure, façade or mechanical project appears in the records, ask what scope has been approved, what remains under review and how owners may be charged. Separate a formally approved assessment from a possible future one. Ask how any lender or insurer assesses unresolved building work.' },
      { heading: 'Compare your own exposure', body: 'Model the unit’s normal monthly dues alongside any known assessment installments and a contingency for uncertain work. Get professional help to interpret structural reports or governing documents. A generic “healthy reserves” label cannot replace a review of this association’s current records.' }
    ],
    ask: 'Name the building and ask for its latest study, budget and assessment notices.'
  },
  'condo-inspections': {
    sections: [
      { heading: 'Find out which inspection applies', body: 'Ask the association whether a milestone inspection or other applicable inspection has been required, completed or scheduled for the building. Request the current report or summary, any phase-two findings and the board’s response. A structural integrity reserve study addresses funding and is a separate record.' },
      { heading: 'Ask what happens after the report', body: 'An identified repair is only one part of the decision. Request the engineer’s scope, approved bids if available, completion schedule and funding plan. Check whether permits or follow-up inspections are open. Distinguish completed work from work the board has discussed but not funded.' },
      { heading: 'Make the contract timeline work for you', body: 'Ask your agent and independent professionals when documents can be obtained and reviewed under the proposed contract. If records are missing or incomplete, identify that gap before the relevant deadline. An inspection report is a point-in-time record, not a guarantee about future condition.' }
    ],
    ask: 'Tell us the building so you can request the right inspection and repair records.'
  },
  'condo-insurance': {
    sections: [
      { heading: 'Separate association coverage from unit coverage', body: 'Request the association’s current insurance summary and budget. Ask an insurance professional which building elements the master policy covers and what you need to insure yourself, including interior improvements and personal property. Do not assume your HOA dues include a policy that covers everything inside your unit.' },
      { heading: 'Check the address and the deductibles', body: 'Use the address in FEMA’s flood map service, then obtain current quotes for the particular unit. Ask about wind, flood and other exclusions and the deductibles that might apply after a loss. A map designation alone is not an insurance quote or a prediction of flooding.' },
      { heading: 'Bring insurance into the financing budget', body: 'Compare annual unit premiums, deductibles, the association’s budgeted insurance expense and any lender requirements. Ask how a change in the master policy could affect dues or assessment exposure. Obtain written terms from a licensed insurer or broker before treating a carrying-cost estimate as reliable.' }
    ],
    ask: 'Share the exact building and unit profile for an insurance-specific cost check.',
    sources: ['insurance']
  },
  'condo-documents': {
    sections: [
      { heading: 'Ask for the rules that affect your use', body: 'Request the declaration, bylaws and current rules. Look for the written rental and pet policies, move-in procedures, parking allocation and any restrictions that matter to your plans. Rules may differ by building and may change. Get the current association version rather than relying on an old listing description.' },
      { heading: 'Ask for the money and condition records', body: 'Request the adopted budget, recent financial statements, reserve study, applicable inspection reports, assessment notices, insurance summary and recent board minutes. Note the date of each record and whether planned work has a funding decision. An attractive monthly fee alone gives an incomplete view of obligations.' },
      { heading: 'Put unanswered questions on the offer timeline', body: 'Ask your agent and legal adviser what documents the seller or association must provide for the transaction and when review rights expire under your contract. Keep a written list of missing records and confirm specific parking or storage rights in the legal documents. Do not infer legal rights from a floor plan or sales sheet.' }
    ],
    ask: 'Tell us the building and your offer timing so the document checklist is relevant.'
  },
  'brickell-commute': {
    sections: [
      { heading: 'Start at the building door', body: 'Time the trip from the actual lobby, including elevator wait, parking exit or the walk to transit. Repeat during a normal weekday commute and an evening return. A map pin between two neighborhoods can miss the part of the trip you repeat every day.' },
      { heading: 'Check more than one travel mode', body: 'Walk to the destinations you use every week. Try the Metromover route and its station access if transit matters to you. If you drive, look at garage access, guest parking and the route in rain or event traffic. Confirm current transit service before relying on it for a purchase decision.' },
      { heading: 'Bring the unit back into the decision', body: 'After finding a workable location, check whether the particular unit adds street noise, pickup congestion or a parking arrangement you dislike. Compare the monthly cost of two candidate buildings against the time each location saves you. Decide whether the tradeoff is worth paying for.' }
    ],
    ask: 'Share your usual destinations, travel hours and whether you walk, drive or use transit.',
    sources: ['transit']
  },
  'first-time-condo-buyer': {
    sections: [
      { heading: 'Keep cash beyond the down payment', body: 'Ask your lender and closing professional for an early cash-to-close estimate. Budget for inspections, insurance, taxes, HOA dues and a post-closing reserve. HOA payments may be separate from a mortgage payment, so compare the combined monthly amount you will actually pay.' },
      { heading: 'Learn the two layers of a condo purchase', body: 'You are evaluating the unit and a share of the building’s obligations. Tour for layout and condition, then request the association’s rules, budget, reserve study, inspection information and known assessments. Ask which repairs and alterations inside the unit would be your responsibility.' },
      { heading: 'Get help before signing deadlines', body: 'Have your agent and independent advisers walk through contract dates, financing, inspection and association document review. If you borrow, check the lender’s Closing Disclosure against the earlier estimate. Resolve unanswered building questions while your contract still provides time to act.' }
    ],
    ask: 'Tell us your total monthly limit and how soon you plan to buy.',
    sources: ['loan', 'hoa']
  },
  'brickell-condo-investment': {
    sections: [
      { heading: 'Verify whether your intended rental use is permitted', body: 'Request the current written association rules for each building. Ask about minimum lease length, approval, registration, caps and fees relevant to your plan. Confirm any other applicable requirements with a local professional. Never build a revenue model from a rental claim in an old listing.' },
      { heading: 'Model net cash flow under pressure', body: 'Start with a supportable rent assumption that you verify independently, then deduct HOA, insurance, tax, maintenance, management and vacancy. Add known assessments and a contingency for unplanned work. Test a lower-rent and higher-cost case before counting projected income toward your purchase budget.' },
      { heading: 'Decide what would make you exit', body: 'Set a maximum purchase price and a minimum acceptable outcome before viewing units. Ask a tax adviser about your ownership structure and circumstances. Check the association’s finances and resale constraints because the unit’s future buyer will evaluate the same building obligations.' }
    ],
    ask: 'Share your rental plan and investment horizon so written rules can be checked against them.'
  },
  'new-construction-vs-resale': {
    sections: [
      { heading: 'Compare the date you need with the date you are promised', body: 'For an unfinished project, ask for the current offering documents, construction status and contractual delivery terms. Plan for the possibility that your move date and the project timeline diverge. For resale, you can usually inspect an existing unit and review the association’s current records before closing.' },
      { heading: 'Separate projected costs from observed costs', body: 'New construction marketing may present estimates for dues, amenities and finishes. Ask which terms are contractual and which can change. For resale, request the adopted budget, reserves, inspection records and any assessment notices. Compare an estimate against actual documents rather than treating them as equal certainty.' },
      { heading: 'Check both transactions with the right advisers', body: 'Have independent counsel review developer deposit terms, changes to plans and cancellation provisions. For a resale, ask about unit condition, association obligations and contract deadlines. Put both options into one cash-flow view: deposits or cash to close, carrying costs and the time until you can use the home.' }
    ],
    ask: 'Tell us your move date, deposit comfort and whether you need an existing unit.'
  }
};
