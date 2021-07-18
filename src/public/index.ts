const canvas: HTMLCanvasElement = document.getElementById("draw-here")!;
const ctx = canvas.getContext("2d");
const ws = new WebSocket(
  `${window.location.href.includes("https") ? "wss" : "ws"}://${
    window.location.host
  }/drawWebsockets`
);

var click = false;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

window.addEventListener("mousedown", (e) => {
  click = true;
});
window.addEventListener("mouseup", (e) => {
  click = false;
});
window.addEventListener("mousemove",async (e) => {
  console.log(click);
  if (click) {
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fill();
    setTimeout(()=>{ws.send(canvas.toDataURL()},100);
   
  }
});
ws.onmessage = (e) => {
  let img = new Image();
  img.src = e.data;
  ctx.drawImage(img, 0, 0);
};
console.log(ctx);
