type Section = { heading: string; text: string; checks: string[] };
type ExploreLink = { label: string; href: string; description: string };
export type PropertyTypeContent = {
  headline: string;
  formHeading: string;
  formDescription: string;
  intro: string;
  sections: Section[];
  brief: string;
  related: { label: string; href: string }[];
  explore: {
    propertyTypes: ExploreLink[];
    areas: ExploreLink[];
    buildings: ExploreLink[];
    buying: ExploreLink[];
  };
};

// These are buyer decision frameworks, not descriptions of available units.
// Do not add prices, building policies, inventory counts or project delivery claims here.
export const propertyTypeContent: Record<string, PropertyTypeContent> = {
  'condos-for-sale': {
    headline: 'Find the right unit in the right building.',
    formHeading: 'Request Brickell condo options.',
    formDescription: 'Share your budget, preferred area and must-haves so current condo options can be checked against your criteria.',
    intro: 'A Brickell condo search spans different streets, buildings and ownership arrangements. Start with the daily location and a realistic total monthly budget, then compare actual units within buildings that pass your document review. The building name alone cannot tell you the layout, view, parking rights or current carrying cost of a particular home.',
    sections: [
      { heading: 'Choose an area before a tower', text: 'Brickell Key, the Brickell Avenue corridor and the streets around the commercial core create different daily routines. Walk from a candidate building entrance to places you will use regularly and test the route at the hours that matter to you.', checks: ['Map your commute and frequent errands from the actual entrance.', 'Decide whether quieter surroundings, walkable retail or waterfront proximity matters more.', 'Compare the building and the specific unit, not an area average.'] },
      { heading: 'Price the whole ownership package', text: 'Purchase price is only the starting point. Use the unit’s current association charge, a post-purchase property tax estimate, insurance quotes and your financing scenario to compare monthly cost. Ask about known assessments and capital work separately.', checks: ['Request the current association budget and fee statement.', 'Review applicable reserve and inspection records with a qualified adviser.', 'Check parking, storage and rental rights in written documents.'] },
      { heading: 'Turn a broad search into a useful brief', text: 'A shortlist works best when it names both requirements and tradeoffs. A buyer who can exchange a higher floor for a better layout will see a different set of possibilities from someone whose view is essential.', checks: ['State your purchase ceiling and comfortable monthly cost.', 'Rank beds, usable layout, parking, view and move date.', 'Name any buildings or areas you want included or excluded.'] }
    ],
    brief: 'Share your budget, preferred area, bedrooms, parking needs and timing. Ask for current options to be checked against that brief.',
    related: [{label:'Compare Brickell buildings',href:'/buildings/'},{label:'Read the HOA fee guide',href:'/hoa-fees/'},{label:'Plan the buying process',href:'/buying-a-condo-in-brickell/'}],
    explore: {
      propertyTypes: [{label:'Compare waterfront condos',href:'/waterfront-condos/',description:'Separate a bayfront address from a unit-level view.'},{label:'Explore luxury residences',href:'/luxury-condos/',description:'Assess service, privacy and total carrying cost.'}],
      areas: [{label:'Explore Brickell Key',href:'/brickell-key/',description:'Test island access and building-specific costs.'},{label:'Compare Brickell Avenue',href:'/brickell-avenue/',description:'See how the corridor changes by block and building.'}],
      buildings: [{label:'Read the Echo Brickell profile',href:'/buildings/echo-brickell/',description:'Review sourced building context and questions for a unit visit.'},{label:'Browse all building guides',href:'/buildings/',description:'Compare the editorial profiles before asking about a specific unit.'}],
      buying: [{label:'Understand HOA fees',href:'/hoa-fees/',description:'Read fees beside budgets, reserves and assessments.'},{label:'Plan a Brickell condo purchase',href:'/buying-a-condo-in-brickell/',description:'Follow the search, document and closing decisions.'}]
    }
  },
  'waterfront-condos': {
    headline: 'Separate the address from the view.',
    formHeading: 'Request Brickell waterfront options.',
    formDescription: 'Tell us which water view matters, your budget and any preferred buildings so suitable options can be checked.',
    intro: '“Waterfront” can describe a building’s location, an actual unit’s outlook or a buyer’s preferred lifestyle. Those are different claims. For each candidate, establish what water the unit faces, what can be seen from its living spaces and how exposure affects the ownership decision.',
    sections: [
      { heading: 'Define the view you are buying', text: 'A waterside address does not give every residence the same outlook. Compare the actual floor, line and orientation, including the view from primary rooms and any outdoor space. Adjacent sites and future work can affect the outlook; request current evidence rather than relying on tower photography.', checks: ['Visit or obtain recent unit-specific views from the actual floor and line.', 'Separate direct water views from partial or side views.', 'Check surrounding parcels and do not treat a view as permanently protected without evidence.'] },
      { heading: 'Check exposure and building costs', text: 'Use the official FEMA map for the exact address as a starting point, then obtain insurance information for both the association and the unit. A map designation by itself is not an insurance quote or a complete account of risk.', checks: ['Review the current association insurance summary and deductibles.', 'Ask for façade, balcony and maintenance records relevant to the building.', 'Get unit-specific coverage guidance from a licensed insurance professional.'] },
      { heading: 'Compare waterfront with the rest of your routine', text: 'The best outlook may not offer the easiest daily access or the ownership costs you want. Compare entrance, traffic, outdoor space and recurring expense with a non-waterfront alternative in your budget.', checks: ['Test arrival and departure at your normal travel times.', 'Compare total monthly cost beside view quality.', 'Decide whether the view, building location or outdoor access is the priority.'] }
    ],
    brief: 'Describe the water view you want, your acceptable monthly cost and whether a specific waterfront building is essential.',
    related: [{label:'Brickell Key area guide',href:'/brickell-key/'},{label:'Condo insurance questions',href:'/condo-insurance/'},{label:'Compare building guides',href:'/buildings/'}],
    explore: {
      propertyTypes: [{label:'Compare all Brickell condos',href:'/condos-for-sale/',description:'Weigh layout and ownership cost alongside the view.'},{label:'Explore penthouses',href:'/penthouses/',description:'Check terrace rights and top-floor exposure.'}],
      areas: [{label:'Explore Brickell Key',href:'/brickell-key/',description:'Consider access and exposure on the island.'},{label:'Compare Brickell Avenue',href:'/brickell-avenue/',description:'Compare exact locations along the corridor.'}],
      buildings: [{label:'Read the Una Residences profile',href:'/buildings/una-residences/',description:'Review the project’s sourced waterfront context; confirm present status separately.'},{label:'Read the Baccarat Residences profile',href:'/buildings/baccarat-residences-miami/',description:'Review the riverfront project context; no unit view or availability is implied.'}],
      buying: [{label:'Check condo insurance questions',href:'/condo-insurance/',description:'Separate association coverage from the unit policy.'},{label:'Review association documents',href:'/condo-documents/',description:'Request current financial, inspection and rules records.'}]
    }
  },
  'luxury-condos': {
    headline: 'Define the experience behind the price.',
    formHeading: 'Request luxury residence options.',
    formDescription: 'Describe your preferred service, privacy, views and budget for a focused Brickell inquiry.',
    intro: 'A luxury search needs more than a list of amenities. Compare the experience of arriving, the privacy of a particular residence, the services actually included and the total cost of owning it. A brand or prominent address cannot answer those questions for every unit.',
    sections: [
      { heading: 'Define luxury in terms you can verify', text: 'Some buyers place privacy first; others prioritize service, outdoor space or a particular view. Visit the entrance and common areas, then ask which services and access rights attach to the unit under consideration.', checks: ['Compare private versus shared access and elevator arrangements.', 'Distinguish included services from optional paid services.', 'Verify parking, storage and amenity rights in current documents.'] },
      { heading: 'Read beyond the marketing presentation', text: 'A polished amenity list is useful for orientation, but the governing documents, actual fee schedule and unit condition determine what ownership entails. For a development, compare promotional descriptions with the applicable offering documents.', checks: ['Request current association finances and assessment information.', 'Check the exact line, floor and surrounding development.', 'Separate a proposed feature from a documented right.'] },
      { heading: 'Compare the premium with your priorities', text: 'Two residences at similar asking prices can differ substantially in layout, service charges, privacy and monthly carrying cost. Use one scorecard and give each factor a weight before requesting a tailored search.', checks: ['Set a purchase ceiling and total monthly comfort range.', 'Rank service, privacy, view, usable space and move-in timing.', 'State which compromises you would accept.'] }
    ],
    brief: 'Tell us which matters most: privacy, service, views, space or a named building, along with budget and timing.',
    related: [{label:'Explore penthouse due diligence',href:'/penthouses/'},{label:'Review condo documents',href:'/condo-documents/'},{label:'Compare Brickell buildings',href:'/buildings/'}],
    explore: {
      propertyTypes: [{label:'Explore penthouses',href:'/penthouses/',description:'Verify outdoor space, access and legal rights.'},{label:'Compare new construction',href:'/new-construction/',description:'Separate proposed features from completed homes.'}],
      areas: [{label:'Compare Brickell Avenue',href:'/brickell-avenue/',description:'Test entrance, orientation and access on the corridor.'},{label:'Explore Brickell Key',href:'/brickell-key/',description:'Consider an island setting against mainland routines.'}],
      buildings: [{label:'Read the Four Seasons profile',href:'/buildings/four-seasons-residences/',description:'Review sourced residence context and unit-specific service questions.'},{label:'Read the SLS LUX profile',href:'/buildings/sls-lux/',description:'Compare the project description with current ownership documents.'}],
      buying: [{label:'Review condo documents',href:'/condo-documents/',description:'Check service rights, budgets and current building rules.'},{label:'Understand ongoing fees',href:'/hoa-fees/',description:'Compare included services with separate charges.'}]
    }
  },
  'penthouses': {
    headline: 'Verify what the penthouse label includes.',
    formHeading: 'Request Brickell penthouse options.',
    formDescription: 'Share your terrace, privacy and layout requirements; ask for the rights of any specific unit to be verified.',
    intro: '“Penthouse” is a marketing label as well as a search term; it does not by itself establish a particular terrace, elevator arrangement or ownership right. Evaluate the exact residence and the written allocation of its indoor and outdoor spaces before paying a premium for the label.',
    sections: [
      { heading: 'Prove the space and rights', text: 'Ask for the legal unit description and current plans. A terrace, roof area, cabana or parking space might be deeded, assigned or subject to limited common use. The distinction affects what you can control and maintain.', checks: ['Match the marketed floor plan to legal and association documents.', 'Confirm terrace and roof-use rights in writing.', 'Check parking, storage and any separate structures.'] },
      { heading: 'Inspect top-floor exposure', text: 'A high floor changes the questions around roof systems, outdoor surfaces, wind, water intrusion and mechanical equipment. An independent inspection and a review of maintenance responsibility can reveal issues a showing cannot.', checks: ['Ask who maintains and repairs roof-adjacent elements.', 'Inspect outdoor areas and drainage with a qualified professional.', 'Review relevant building repair and assessment records.'] },
      { heading: 'Test privacy and practical use', text: 'Exclusivity depends on the actual floor and building configuration. Visit the residence, study access points and consider whether the rooms and outdoor areas work for your everyday use, not only for a brochure photograph.', checks: ['Check elevator access and proximity to shared or mechanical spaces.', 'Examine sunlight, orientation and neighboring sightlines.', 'Compare total monthly cost with another premium residence.'] }
    ],
    brief: 'Specify your required terrace, privacy, layout, parking and budget; ask about a penthouse only after its unit-level rights can be verified.',
    related: [{label:'Luxury residence guide',href:'/luxury-condos/'},{label:'Condo document checklist',href:'/condo-documents/'},{label:'Review ownership costs',href:'/hoa-fees/'}],
    explore: {
      propertyTypes: [{label:'Compare luxury residences',href:'/luxury-condos/',description:'Assess service, privacy and total cost.'},{label:'Explore waterfront condos',href:'/waterfront-condos/',description:'Compare a specific view with location and exposure.'}],
      areas: [{label:'Explore Brickell Key',href:'/brickell-key/',description:'Assess island access and building differences.'},{label:'Compare Brickell Avenue',href:'/brickell-avenue/',description:'Consider orientation, arrival and daily routes.'}],
      buildings: [{label:'Browse Brickell building profiles',href:'/buildings/',description:'Research building context before verifying any penthouse unit.'},{label:'Read the Echo Brickell profile',href:'/buildings/echo-brickell/',description:'Use its building questions without assuming penthouse availability.'}],
      buying: [{label:'Check condo documents',href:'/condo-documents/',description:'Verify terrace and limited-use rights in writing.'},{label:'Review condo inspections',href:'/condo-inspections/',description:'Connect top-floor questions with current building records.'}]
    }
  },
  'new-construction': {
    headline: 'Know the project stage before comparing homes.',
    formHeading: 'Request new construction options.',
    formDescription: 'Tell us your budget, timeline and whether you would consider completed homes as well as active developments.',
    intro: 'New construction in Brickell can mean a proposed project, an active development or a completed residence being sold for the first time. These stages offer different evidence and different timing risks. Identify the stage before comparing a project with an existing condo.',
    sections: [
      { heading: 'Separate concept, contract and completed home', text: 'Renderings describe an intended product. Ask for the latest developer materials and applicable offering documents, then confirm the current project status and the exact residence being considered. Plans, features and dates may change.', checks: ['Confirm whether the project is proposed, under construction or delivered.', 'Compare the unit plan and specifications with contract documents.', 'Verify timing through current project records, not an old announcement.'] },
      { heading: 'Understand the cash and timing path', text: 'A development purchase can involve staged deposits before occupancy, while a completed resale follows a different transaction timetable. Have independent counsel review deposit, escrow, change and completion provisions for the specific contract.', checks: ['Map each deposit amount and due date before committing.', 'Review contractual changes and cancellation provisions with counsel.', 'Keep a separate plan if the intended move-in date changes.'] },
      { heading: 'Compare projected and actual costs', text: 'Projected association expenses are estimates. An operating resale association has an adopted budget and history to inspect. Compare these different kinds of evidence without presenting one as equally certain as the other.', checks: ['Request the proposed budget and what it includes.', 'Compare it with current resale budgets and insurance information.', 'Allow for changes in taxes, insurance and financing before occupancy.'] }
    ],
    brief: 'Share your move date, deposit comfort level, budget and whether you would also consider a completed resale.',
    related: [{label:'New construction vs resale',href:'/new-construction-vs-resale/'},{label:'Closing cost guide',href:'/closing-costs/'},{label:'Review building guides',href:'/buildings/'}],
    explore: {
      propertyTypes: [{label:'Compare completed condos',href:'/condos-for-sale/',description:'Use current unit and association records as a different evidence base.'},{label:'Explore luxury residences',href:'/luxury-condos/',description:'Compare proposed services against documented rights.'}],
      areas: [{label:'Compare Brickell Avenue',href:'/brickell-avenue/',description:'Test the exact location and nearby routes.'},{label:'Explore Brickell Key',href:'/brickell-key/',description:'Consider a different area and building choice.'}],
      buildings: [{label:'Read the Una Residences profile',href:'/buildings/una-residences/',description:'Review published project context; verify current stage directly.'},{label:'Read the Cipriani Residences profile',href:'/buildings/cipriani-residences-miami/',description:'Examine project questions without assuming delivery or inventory.'}],
      buying: [{label:'Compare new construction with resale',href:'/new-construction-vs-resale/',description:'Weigh projected terms against an existing unit.'},{label:'Plan closing costs',href:'/closing-costs/',description:'Request a transaction-specific estimate.'}]
    }
  }
};
