import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import { Application,Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

<<<<<<< Updated upstream
const app = new Application();
const router = new Router()
router.get('/', (ctx) => {
  ctx.response.body = 'Received a GET HTTP method';
});

// dont touch / route as it handles the socket part,add all the auth stuff in some other route 
=======
const app = new Application(); //
const port = 8080;
const router = new Router();

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

router.get("/start_web_socket", async (ctx) => {
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
});

app.use(router.routes());
app.use(router.allowedMethods());

>>>>>>> Stashed changes


app.use(router.allowedMethods());
app.use(router.routes());


const io = new Server();

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.emit("hello", "world");

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

const handler = io.handler(async (req) => {
  return await app.handle(req) || new Response(null, { status: 404 });
});

await serve(handler, {
  port: 8080,
});