export default async function handler(req, res) {
  const apiKey = process.env.BSCSCAN_API_KEY;
  const address = '0x...'; // Use a popular BEP20 address
  const url = `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
}