const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const app = express();

app.use(express.json());
app.use(express.static('public'));

// Initialize Gemini client using the environment variable saved in Vercel
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Call the Gemini API with the recommended model name
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: userMessage,
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'The assistant is unavailable right now.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
