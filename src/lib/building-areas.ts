import { buildings } from './buildings';

// Editorial search areas used for navigation, not legal neighborhood boundaries.
export function areaLink(area:string) {
 if(area.includes('Brickell Key')) return {label:'Brickell Key',href:'/brickell-key/'};
 if(area.includes('riverfront')) return {label:'North Brickell / river edge',href:'/north-brickell-miami-river/'};
 if(area.includes('Bay')) return {label:'Brickell Bay Drive',href:'/brickell-bay-drive/'};
 if(area.includes('South Brickell')) return {label:'South Brickell',href:'/south-brickell/'};
 if(area.includes('Avenue')) return {label:'Brickell Avenue',href:'/brickell-avenue/'};
 return {label:'Brickell Core',href:'/brickell-core/'};
}

export function buildingsInArea(href:string) {
 return buildings.filter(b=>areaLink(b.area).href===href);
}
