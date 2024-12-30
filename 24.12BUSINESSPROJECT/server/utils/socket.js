export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    //listen for connection
    console.log("User connected:", socket.id);

    socket.on("subscribe", (businessId) => {
      //join room
      socket.join(businessId);
      console.log(`User joined room: ${businessId}`);
    });

    socket.on("unsubscribe", (businessId) => {
      //leave room
      socket.leave(businessId);
      console.log(`User left room: ${businessId}`);
    });

    socket.on("disconnect", () => {
      //disconnect
      console.log("User disconnected:", socket.id);
    });
  });
};

export const notifySubscribers = (io, businessId, message) => {
  io.to(businessId).emit("notification", message);
};
