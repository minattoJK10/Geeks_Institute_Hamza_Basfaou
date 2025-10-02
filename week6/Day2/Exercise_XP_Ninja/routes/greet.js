// routes/greet.js
const express = require('express');
const router = express.Router();

// List of available emojis
const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

// ✅ GET / : Display the form
router.get('/', (req, res) => {
  const form = `
    <html>
      <head>
        <title>Emoji Greeting App</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
          h1 { color: #333; }
          form { margin-top: 20px; }
          select, input[type="text"], button {
            padding: 10px;
            margin: 5px;
            font-size: 16px;
          }
          .greeting {
            margin-top: 30px;
            font-size: 24px;
            font-weight: bold;
            color: #444;
          }
        </style>
      </head>
      <body>
        <h1>🎊 Welcome to the Emoji Greeting App 🎊</h1>
        <form action="/greet" method="POST">
          <input type="text" name="name" placeholder="Enter your name" required />
          <select name="emoji">
            ${emojis.map(e => `<option value="${e}">${e}</option>`).join('')}
          </select>
          <button type="submit">Greet Me!</button>
        </form>
      </body>
    </html>
  `;
  res.send(form);
});

// ✅ POST /greet : Process form and show personalized greeting
router.post('/greet', (req, res) => {
  const { name, emoji } = req.body;

  if (!name || name.trim() === "") {
    return res.send(`<p style="color:red;">⚠️ Please enter your name!</p><a href="/">Go back</a>`);
  }

  const greeting = `
    <html>
      <head>
        <title>Greeting</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
          h1 { font-size: 32px; color: #222; }
          a { display: inline-block; margin-top: 20px; text-decoration: none; padding: 10px 20px; background: #007bff; color: white; border-radius: 5px; }
          a:hover { background: #0056b3; }
        </style>
      </head>
      <body>
        <h1>Hello, ${name}! ${emoji}</h1>
        <a href="/">Back to Home</a>
      </body>
    </html>
  `;

  res.send(greeting);
});

module.exports = router;
