export type OwnershipInput = {
  price:number; mortgage:boolean; downPercent:number; annualRate:number; years:number;
  monthlyHoa:number; annualTaxes:number; annualInsurance:number; monthlyAssessment:number;
  monthlyReserve:number; monthlyOther:number; monthlyMortgageInsurance:number; closingCosts:number;
};

export function monthlyPayment(principal:number, annualRate:number, years:number):number {
  if(!Number.isFinite(principal)||principal<0||!Number.isFinite(annualRate)||annualRate<0||annualRate>100||!Number.isFinite(years)||years<1||years>50) throw new RangeError('Invalid loan inputs');
  if(principal===0)return 0;
  const n=years*12, r=annualRate/1200;
  return r===0?principal/n:principal*r/(-Math.expm1(-n*Math.log1p(r)));
}
export function calculateOwnership(i:OwnershipInput) {
  if(Object.values(i).some(v=>typeof v==='number'&&(!Number.isFinite(v)||v<0))||i.price<=0||i.downPercent>100||i.annualRate>100||i.years<1||i.years>50) throw new RangeError('Invalid ownership inputs');
  const down=i.mortgage?i.price*i.downPercent/100:i.price;
  const loan=i.mortgage?i.price-down:0;
  const payment=monthlyPayment(loan,i.annualRate,i.years);
  const rows=[
    {label:'Mortgage principal & interest',amount:payment},
    {label:'Regular association charges',amount:i.monthlyHoa},
    {label:'Property tax (annual ÷ 12)',amount:i.annualTaxes/12},
    {label:'Unit / additional insurance (annual ÷ 12)',amount:i.annualInsurance/12},
    {label:'Separate assessment installments',amount:i.monthlyAssessment},
    {label:'Personal contingency contribution',amount:i.monthlyReserve},
    {label:'Other monthly costs',amount:i.monthlyOther},
    {label:'Mortgage insurance',amount:i.mortgage?i.monthlyMortgageInsurance:0}
  ];
  const monthly=rows.reduce((total,row)=>total+row.amount,0);
  return {rows,monthly,annual:monthly*12,down,loan,purchaseCash:down+i.closingCosts};
}
export type OwnershipResult = ReturnType<typeof calculateOwnership>;
