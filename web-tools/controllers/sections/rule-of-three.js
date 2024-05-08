const axInput = querySelector('#ruleOfThreeAxInput');
const ayInput = querySelector('#ruleOfThreeAyInput');
const bxInput = querySelector('#ruleOfThreeBxInput');
const byInput = querySelector('#ruleOfThreeByInput');

const calculateRuleOfThree = () => {
  const ax = toNumber(axInput.value);
  const ay = toNumber(ayInput.value);
  const bx = toNumber(bxInput.value);

  const ruleOfThree = getRuleOfThree(ax, ay, bx);
  byInput.value = ruleOfThree || '';
};

const getRuleOfThree = (ax, ay, bx) => {
  return ax && ay && bx ? (bx * ay) / ax : undefined;
};
