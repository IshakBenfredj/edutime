const io = require("socket.io")(8900, {
  cors: {
    origin: "https://edutimee.vercel.app",
    // origin: "http://localhost:3000",
  },
});

let users = [];
let onlineUsers = [];

const addUser = (userId, socketId) => {
  !users.find((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const addOnlineUser = (userId, socketId) => {
  !onlineUsers.find((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const removeOnlineUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const getOnlineUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log(`a user connected ${socket.id}`);

  //take userId and socketId from user
  // Messages
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  // Notifications
  socket.on("addOnlineUser", (userId) => {
    addOnlineUser(userId, socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  //send and get notification
  socket.on("sendNotification", (data) => {
    const user = getOnlineUser(data.userTo);
    if (user) {
      io.to(user.socketId).emit("getNotification", data);
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    removeOnlineUser(socket.id);
    io.emit("getUsers", users);
    io.emit("getOnlineUsers", onlineUsers);
  });
});
