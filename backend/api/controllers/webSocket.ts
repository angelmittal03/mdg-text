
const connectedClients = new Map();
// send a message to all connected clients
function broadcast(message) {
    for (const client of connectedClients.values()) {
      client.send(message);
    }
  }
  
  // send updated users list to all connected clients
  function broadcast_usernames() {
    const usernames = [...connectedClients.keys()];
    console.log(
      "Sending updated username list to all clients: " +
        JSON.stringify(usernames),
    );
    // broadcast(
    //   JSON.stringify({
    //     event: "update-users",
    //     usernames: usernames,
    //     message:"new user added"
    //   }),
    // );
  }


export const socketConnection = async (ctx) => {
        const socket = await ctx.upgrade();
        const username = ctx.request.url.searchParams.get("username");
        if (connectedClients.has(username)) {
          socket.close(1008, `Username ${username} is already taken`);
          return;
        }
        socket.username = username;
        connectedClients.set(username, socket);
        console.log(`New client connected: ${username}`);
      
        // broadcast the active users list when a new user logs in
        socket.onopen = () => {
          broadcast_usernames();
        };
      
        // when a client disconnects, remove them from the connected clients list
        // and broadcast the active users list
        socket.onclose = () => {
          console.log(`Client ${socket.username} disconnected`);
          connectedClients.delete(socket.username);
          broadcast_usernames();
        };
      
        // broadcast new message if someone sent one
        socket.onmessage = (m) => {
          const data = JSON.parse(m.data);
          switch (data.event) {
            case "send-message":
              console.log(data)
              broadcast(
                JSON.stringify({
                  event: "send-message",
                  username: socket.username,
                  message: data.message,
                }),
              );
              break;
          }
        };
      }