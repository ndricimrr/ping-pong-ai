function pingLoop() {
  console.log("Ping");
  setTimeout(() => {
    console.log("     Pong");
  }, 1000);
}

// Continuously print Ping Pong on the console cuz its cool :)
// setInterval(() => {
//   pingLoop();
// }, 2000);

window.addEventListener("ping", (event) => {
  console.log("...Ping received :", event.detail.message);
});

window.addEventListener("pong", (event) => {
  console.log("...Pong received :", event.detail.message);
});

function dispatchPing(data) {
  console.log("Sending Ping...");
  const customEvent = new CustomEvent("ping", { detail: data });
  window.dispatchEvent(customEvent);
}

function dispatchPong(data) {
  console.log("Sending Pong...");
  const customEvent = new CustomEvent("pong", { detail: data });
  window.dispatchEvent(customEvent);
}

dispatchPing({ message: "Ping" });
dispatchPong({ message: "Pong" });
