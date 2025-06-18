
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        contents: [{ parts: [{ text: userMsg }] }]
      }
    );

    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "Error from Gemini API" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
