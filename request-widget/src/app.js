import d3 from 'd3';
import TargetingEngineTree from './targeting-engine/tree';

//let request = '(mkt_sgm[value = "gold + long"] && mkt_sgm[value = "gold"] && mkt_sgm[value = "gold"] && mkt_sgm[value = "gold"] && mkt_sgm[value = "gold"] && mkt_sgm[value = "gold"] && mkt_sgm[value = "gold"] && (bought_solar[value = false] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"] || gender[value = "male"]))  || (bought_solar[value = false] && gender[value = "male"])';
let request = 'sgm_esso [value >= 125] || sgm_kaufhof [value >= 15] && sgm_obi [value >= 10]';
let widget = new TargetingEngineTree('#main', request, {targetingEngine: {base: 'client1'}});
let error = d3.select('#error');
let input = d3.select('#request');
let timeout = null;

function onRequestChange() {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    timeout = null;
    error.classed('active', false);
    try {
      widget.setData(input.property('value'));
    } catch (err) {
      error.classed('active', true).html(`<span>${err}</span>`);
    }
  }, 200);
}

input.property('value', request)
  .on('keyup', onRequestChange);

widget.on('change', (data) => {
  input.property('value', data);
}).on('editNode', (data) => {
  console.log('Node to edit', data);
}).on('addToNode', (data) => {
  console.log('Node to enrich', data);
});
