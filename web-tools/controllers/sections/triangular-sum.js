const triangularSumStartInput = jQuery('#triangularSumStartInput');
const triangularSumEndInput = jQuery('#triangularSumEndInput');
const triangularSumOutput = jQuery('#triangularSumOutput');

const calculateTriangularSum = () => {
  const start = toNumber(triangularSumStartInput.val()) || 1;
  const end = toNumber(triangularSumEndInput.val());

  const triangularSum = getTriangularSum(start, end);
  triangularSumOutput.val(triangularSum);
};

const getTriangularSum = (start, end) => {
  if (!(start && end && start <= end)) return undefined;
  const min = ((start - 1) * (start - 1 + 1)) / 2;
  const max = (end * (end + 1)) / 2;
  return max - min;
};
