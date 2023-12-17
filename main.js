function pingLoop() {
  console.log("Ping");
  setTimeout(() => {
    console.log("     Pong");
  }, 1000);
}

// Continuously print Ping Pong on the console cuz its cool :)
setInterval(() => {
  pingLoop();
}, 2000);
