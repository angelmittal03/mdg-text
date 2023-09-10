import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import route from "./api/routes/allRoutes.js";
const connectedClients = new Map();


const app = new Application();
const port = 8080;
const router = new Router();

// send a message to all connected clients
function broadcast(message) {
  console.log(message)
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
    
        broadcast(
          JSON.stringify({
            event: "send-message",
            username: socket.username,
            message: data.message,
            docname: data.docname
          }),
        );
        
    
  };
});
app.use(async (ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  ctx.response.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(route.routes());
app.use(route.allowedMethods());


console.log("Listening at http://localhost:" + port);
await app.listen({ port });