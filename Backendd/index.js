const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected!', res.rows);
  } catch (err) {
    console.error('Connection error:', err);
  }
})();

// OpenAI

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// const openai = new OpenAIApi(new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// }));

// ROUTES

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Add a todo
app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  try {
    const result = await pool.query('INSERT INTO todos (text) VALUES ($1) RETURNING *', [text]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Summarize & Send to Slack
app.post('/api/summarize', async (req, res) => {
  try {
    const result = await pool.query('SELECT text FROM todos');
    const todos = result.rows.map(todo => todo.text).join('\n');

    const summaryPrompt = `Summarize the following to-do list:\n${todos}`;
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: summaryPrompt }],
    });

    const summary = completion.data.choices[0].message.content;

    // Send to Slack
    await axios.post(process.env.SLACK_WEBHOOK_URL, { text: summary });

    res.json({ message: 'Summary sent to Slack!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to summarize or send to Slack' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
