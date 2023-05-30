const NotificationModel = require("../model/NotificationModel");
class SocketServices {
  //connection socket
  connection(socket) {
    socket.on("disconnect", () => {
      console.log(`User disconnect id is ${socket.id}`);
    });

    // socket.emit('chat','as');
  }

  async messsage(socket, username) {
    NotificationModel.create({
      title: "Thông báo",
      content: "Bạn vừa lập phiếu thành công",
      user_id: username,
      status: false,
    });
    const data = await NotificationModel.find({ user_id: username });
    console.log(data);
    socket.to(socket.id).emit("notice", socket.id,data);
  }
}
module.exports = new SocketServices();
