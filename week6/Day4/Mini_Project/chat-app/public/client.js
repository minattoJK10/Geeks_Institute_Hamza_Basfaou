const socket = io();

// DOM
const joinScreen = document.getElementById("join-screen");
const joinBtn = document.getElementById("join-btn");
const randomBtn = document.getElementById("random-btn");
const usernameInput = document.getElementById("username");
const roomInput = document.getElementById("room");

const chatScreen = document.getElementById("chat-screen");
const roomNameEl = document.getElementById("room-name");
const usersList = document.getElementById("users-list");
const messagesEl = document.getElementById("messages");
const form = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const leaveBtn = document.getElementById("leave-btn");
const statusEl = document.getElementById("status");
const notifSound = document.getElementById("notif-sound");

let currentRoom = null;
let currentUsername = null;
let isWindowFocused = true;
let titleInterval = null;
const originalTitle = document.title;

// helpers
function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function addMessage({ user, text, time }, isMe = false, isSystem = false) {
  const div = document.createElement("div");
  div.classList.add("message");
  if (isMe) div.classList.add("me");
  if (isSystem) div.classList.add("system");

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `${user} • ${formatTime(time)}`;

  const txt = document.createElement("div");
  txt.className = "text";
  txt.textContent = text;

  div.appendChild(meta);
  div.appendChild(txt);
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// notifications when new message arrives and window not focused
function notifyNewMessage() {
  if (!isWindowFocused) {
    let toggle = false;
    if (titleInterval) clearInterval(titleInterval);
    titleInterval = setInterval(() => {
      document.title = toggle ? "(New) Chat Message" : originalTitle;
      toggle = !toggle;
    }, 900);
    // play sound if available
    try { notifSound && notifSound.play(); } catch (e) { /* autoplay blocked */ }
  }
}

// restore title on focus
window.addEventListener("focus", () => {
  isWindowFocused = true;
  if (titleInterval) {
    clearInterval(titleInterval);
    titleInterval = null;
  }
  document.title = originalTitle;
});

window.addEventListener("blur", () => { isWindowFocused = false });

// join flow
joinBtn.addEventListener("click", () => {
  const username = (usernameInput.value || "").trim();
  const room = (roomInput.value || "").trim();

  if (!username) return alert("Please enter a username.");
  if (!room) return alert("Please enter a room name.");

  joinRoom(username, room);
});

randomBtn.addEventListener("click", () => {
  const username = (usernameInput.value || `User${Math.floor(Math.random()*999)}`).trim();
  const room = `room-${Math.floor(Math.random()*1000)}`;
  usernameInput.value = username;
  roomInput.value = room;
});

// join function
function joinRoom(username, room) {
  socket.emit("joinRoom", { username, room }, (resp) => {
    if (resp && resp.error) {
      alert(resp.error);
      return;
    }
    currentUsername = username;
    currentRoom = room;
    roomNameEl.textContent = room;
    joinScreen.classList.add("hidden");
    chatScreen.classList.remove("hidden");
    messageInput.focus();
    // save username to localStorage for convenience
    localStorage.setItem("chat_username", username);
  });
}

// receive messages
socket.on("message", (msg) => {
  const isSystem = msg.user === "System";
  const isMe = msg.user === currentUsername;
  addMessage(msg, isMe, isSystem);
  if (!isSystem) notifyNewMessage();
});

// roomData -> update active users
socket.on("roomData", ({ room, users }) => {
  // update users list
  usersList.innerHTML = "";
  users.forEach(u => {
    const li = document.createElement("li");
    li.textContent = u.username;
    li.dataset.id = u.id;
    li.title = "Click to private message";
    // Click to send a private message (optional)
    li.addEventListener("click", () => {
      const text = prompt(`Private message to ${u.username}:`);
      if (!text) return;
      socket.emit("privateMessage", { toSocketId: u.id, text }, (ack) => {
        if (ack && ack.ok) {
          addMessage({ user: `To ${u.username}`, text, time: new Date().toISOString() }, true);
        } else {
          alert(ack?.error || "Could not send private message.");
        }
      });
    });
    usersList.appendChild(li);
  });
});

// private messages
socket.on("privateMessage", ({ from, text, time, fromId, toId }) => {
  addMessage({ user: `[PM] ${from}`, text, time }, false);
  notifyNewMessage();
});

// send chat message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;
  socket.emit("chatMessage", { text }, (ack) => {
    if (ack && ack.ok) {
      addMessage({ user: currentUsername, text, time: new Date().toISOString() }, true);
      messageInput.value = "";
      messageInput.focus();
    } else {
      alert(ack?.error || "Message failed");
    }
  });
});

// leave button
leaveBtn.addEventListener("click", () => {
  if (!confirm("Leave the room?")) return;
  socket.emit("leaveRoom", (ack) => {
    // reset UI
    currentRoom = null;
    currentUsername = null;
    joinScreen.classList.remove("hidden");
    chatScreen.classList.add("hidden");
    messagesEl.innerHTML = "";
    usersList.innerHTML = "";
    usernameInput.value = localStorage.getItem("chat_username") || "";
    roomInput.value = "";
  });
});

// autofill username if saved
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("chat_username");
  if (saved) usernameInput.value = saved;
});
