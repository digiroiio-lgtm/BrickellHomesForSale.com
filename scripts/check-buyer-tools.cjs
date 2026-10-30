/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,file);
const {monthlyPayment,calculateOwnership}=require('../src/lib/ownership-calculator.ts');
const {comparisonBuildings,comparisonZones}=require('../src/lib/building-comparison.ts');
const near=(actual,expected)=>assert(Math.abs(actual-expected)<0.005,`${actual} differs from ${expected}`);
// Independently established mortgage reference: $100k at 6% over 30 years = $599.55/month.
near(monthlyPayment(100000,6,30),599.55);
near(monthlyPayment(120000,0,10),1000);
near(monthlyPayment(0,6,30),0);
const cash={price:750000,mortgage:false,downPercent:20,annualRate:6,years:30,monthlyHoa:1000,annualTaxes:9000,annualInsurance:2400,monthlyAssessment:100,monthlyReserve:200,monthlyOther:150,monthlyMortgageInsurance:50,closingCosts:20000};
const a=calculateOwnership(cash);
near(a.monthly,2400);near(a.annual,28800);near(a.loan,0);near(a.purchaseCash,770000);
const b=calculateOwnership({...cash,mortgage:true});
near(b.loan,600000);near(b.purchaseCash,170000);near(b.monthly,6047.30);
near(calculateOwnership({...cash,mortgage:true,downPercent:100}).loan,0);
for(const invalid of [{...cash,price:-1},{...cash,monthlyHoa:NaN},{...cash,downPercent:101},{...cash,annualRate:-1},{...cash,years:0},{...cash,years:51}])assert.throws(()=>calculateOwnership(invalid),RangeError);
assert.equal(comparisonBuildings.length,23);
assert.equal(new Set(comparisonBuildings.map(b=>b.slug)).size,23);
for(const b of comparisonBuildings){assert(comparisonZones.includes(b.zone),b.slug);assert(b.source.url.startsWith('https://'));assert(b.profileReviewed);assert(b.confirmed.length>0);}
assert.equal(comparisonBuildings.filter(b=>b.evidence).length,3);
console.log('Buyer tools OK: cash, fixed-rate and zero-rate math; invalid inputs; 23 unique source-linked comparison records.');
