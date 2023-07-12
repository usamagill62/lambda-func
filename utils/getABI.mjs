export const getABI = async (address) => {
  const KEY = "H2SS5BRHSD7MFN464PZ9ZAJ17Y2JXI74EM";
  const URL = `https://api.polygonscan.com/api?module=contract&action=getabi&address=${address}&apikey=${KEY}`;
  const response = await fetch(URL);
  const data = await response.json();
  return JSON.parse(data.result);
};
