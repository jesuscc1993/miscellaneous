const triangularSumStartInput = querySelector('#triangularSumStartInput');
const triangularSumEndInput = querySelector('#triangularSumEndInput');
const triangularSumOutput = querySelector('#triangularSumOutput');

const calculateTriangularSum = () => {
  const start = toNumber(triangularSumStartInput.value) || 1;
  const end = toNumber(triangularSumEndInput.value);

  const triangularSum = getTriangularSum(start, end);
  triangularSumOutput.value = triangularSum || '';
};

const getTriangularSum = (start, end) => {
  if (!(start && end && start <= end)) return undefined;
  const min = ((start - 1) * (start - 1 + 1)) / 2;
  const max = (end * (end + 1)) / 2;
  return max - min;
};
