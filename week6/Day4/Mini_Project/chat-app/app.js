const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

// In-memory user storage (sufficient for demo)
// users: socketId => { username, room }
const users = new Map();

function getUsersInRoom(room) {
  const arr = [];
  for (const [, user] of users) {
    if (user.room === room) arr.push({ username: user.username, id: user.id });
  }
  return arr;
}

// When a client connects
io.on("connection", socket => {
  console.log("Socket connected:", socket.id);

  // Join room event: { username, room }
  socket.on("joinRoom", ({ username, room }, ack) => {
    if (!username || !room) {
      return ack && ack({ error: "Username and room are required." });
    }

    // store user
    users.set(socket.id, { id: socket.id, username, room });
    socket.join(room);

    // Welcome message to the user
    socket.emit("message", {
      user: "System",
      text: `Welcome ${username}! You joined room "${room}".`,
      time: new Date().toISOString(),
    });

    // Notify others in room
    socket.to(room).emit("message", {
      user: "System",
      text: `${username} joined the chat.`,
      time: new Date().toISOString(),
    });

    // Send updated active users list for the room
    io.in(room).emit("roomData", {
      room,
      users: getUsersInRoom(room),
    });

    ack && ack({ ok: true });
  });

  // Chat message: { text }
  socket.on("chatMessage", (msg, ack) => {
    const user = users.get(socket.id);
    if (!user) return ack && ack({ error: "User not found." });

    const message = {
      user: user.username,
      text: msg.text,
      time: new Date().toISOString(),
    };

    // Broadcast to room
    io.in(user.room).emit("message", message);
    ack && ack({ ok: true });
  });

  // Private message: { toSocketId, text } optional advanced feature
  socket.on("privateMessage", ({ toSocketId, text }, ack) => {
    const sender = users.get(socket.id);
    if (!sender) return ack && ack({ error: "Sender not found." });
    if (!toSocketId || !text) return ack && ack({ error: "Destination and text required." });

    const payload = {
      from: sender.username,
      fromId: socket.id,
      toId: toSocketId,
      text,
      time: new Date().toISOString(),
    };

    // send only to target socket and to sender (so sender can show it)
    socket.to(toSocketId).emit("privateMessage", payload);
    socket.emit("privateMessage", payload);
    ack && ack({ ok: true });
  });

  // Leave room explicitly (optional)
  socket.on("leaveRoom", ack => {
    const user = users.get(socket.id);
    if (!user) return ack && ack({ error: "User not found." });

    socket.leave(user.room);
    socket.to(user.room).emit("message", {
      user: "System",
      text: `${user.username} left the chat.`,
      time: new Date().toISOString(),
    });
    users.delete(socket.id);

    io.in(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    ack && ack({ ok: true });
  });

  // on disconnect
  socket.on("disconnect", reason => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      socket.to(user.room).emit("message", {
        user: "System",
        text: `${user.username} disconnected.`,
        time: new Date().toISOString(),
      });

      io.in(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
    console.log("Socket disconnected:", socket.id, "reason:", reason);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
