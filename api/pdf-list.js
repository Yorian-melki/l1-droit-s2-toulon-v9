export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    const response = await fetch('https://api.github.com/repos/Yorian-melki/L1-droit-pdfs/contents');
    const files = await response.json();

    const pdfs = files
      .filter(f => f.name.endsWith('.pdf'))
      .map(f => ({
        name: f.name,
        download_url: f.download_url,
        size: f.size
      }));

    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
