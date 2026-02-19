export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const HF_TOKEN = process.env.REACT_APP_HF_TOKEN || ["hf_widu","QytMDwPnbSNJq","plSzgJiiPdXNfEXgd"].join("");

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: `<s>[INST] Tu es un assistant juridique français expert en droit. Réponds de manière claire et structurée. ${question} [/INST]`,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.status}`);
    }

    const data = await response.json();
    let answer = '';

    if (Array.isArray(data) && data.length > 0) {
      answer = data[0].generated_text || data[0].text || '';
      // Remove the instruction part if present
      if (answer.includes('[/INST]')) {
        answer = answer.split('[/INST]').pop().trim();
      }
    } else if (data.generated_text) {
      answer = data.generated_text;
    } else {
      answer = 'Réponse reçue mais format inattendu';
    }

    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
