const axInput = jQuery('#ruleOfThreeAxInput');
const ayInput = jQuery('#ruleOfThreeAyInput');
const bxInput = jQuery('#ruleOfThreeBxInput');
const byInput = jQuery('#ruleOfThreeByInput');

const calculateRuleOfThree = () => {
  const ax = toNumber(axInput.val());
  const ay = toNumber(ayInput.val());
  const bx = toNumber(bxInput.val());

  const ruleOfThree = getRuleOfThree(ax, ay, bx);
  byInput.val(ruleOfThree);
};

const getRuleOfThree = (ax, ay, bx) => {
  return ax && ay && bx ? (bx * ay) / ax : undefined;
};
