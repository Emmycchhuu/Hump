export default function handler(req, res) {
  res.status(200).json({
    result: [
      { hash: '0x123abc', from: '0x456def', to: '0x789ghi' },
      { hash: '0xabc123', from: '0xdef456', to: '0xghi789' },
    ],
  });
}
