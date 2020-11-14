// import { selectSockerServers } from '../websocket/selectors';

// export function connectionCheck() {
//   setInterval(() => {
//     const servers = selectSockerServers();
//     Object.keys(servers).forEach(gameId => {
//       const server = servers[gameId];
//       server.clients.forEach(ws => {
//         if (!ws.CLOSING) return ws.terminate();

//         ws.isAlive = false;
//         ws.ping(null, false, true);
//       });
//     });
//   }, 10000);
// }
