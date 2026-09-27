export function Diagram({kind}:{kind:'budget'|'journey'|'hoa'|'comparison'|'construction'}) {
  const data={
    budget:{title:'A buyer budget is more than the purchase price',nodes:[['01','Price ceiling'],['02','Cash to close'],['03','Monthly carry'],['04','Repair reserve']]},
    journey:{title:'From criteria to a confident close',nodes:[['01','Define the brief'],['02','Check availability'],['03','Review documents'],['04','Close with advice']]},
    hoa:{title:'What to read behind the HOA fee',nodes:[['01','Operations'],['02','Insurance'],['03','Reserves'],['04','Assessments']]},
    comparison:{title:'Compare addresses, then actual units',nodes:[['01','Daily route'],['02','Street feel'],['03','Building records'],['04','Total cost']]},
    construction:{title:'New development versus resale',nodes:[['NEW','Plans & delivery'],['NEW','Projected budget'],['RESALE','Inspect unit'],['RESALE','Current records']]}
  }[kind];
  return <figure className="diagram"><figcaption><span className="eyebrow">BUYER CHECKLIST</span><strong>{data.title}</strong></figcaption><div className="diagram-grid">{data.nodes.map(([num,label])=><div className="diagram-node" key={label}><span>{num}</span><b>{label}</b></div>)}</div><p>Confirm costs, rights and availability for the specific condo before making an offer.</p></figure>;
}
