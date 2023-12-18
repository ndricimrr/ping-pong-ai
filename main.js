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

// TODO: Later on Consider Ping Pong between Iframes. With Post Messages.
// TODO: Later on Consider throwing a ball in a grid of Iframes, and it bounces as if it were in a full large rectangle/circle using postMessage API if possible (use canvas draw instead)
// TODO: Later on Consider Simple Ping pong between WebComponents with Communication BUS
// TODO: Train Simple models on Cloud
// TODO: Maybe use whisper or a mini version of it to narrate complaining AI when Human cheats or similar situation
// TODO: Add boosts to Human Player to give advantage over AI when it becomes too smart. (general speed bost, on bounce boost, etc)

/**
 *
 *
 *
 * TODO: Keep this repo with DOM elements manipulation here. Make it as smooth as possible, and keep it 2 player game as its easier.
 *         Create another REPO where you create this logic with canvas manipulation since its faster, smoother
 */
