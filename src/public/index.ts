const canvas: HTMLCanvasElement = document.getElementById("draw-here")!;
const ctx = canvas.getContext("2d");
const ws = new WebSocket(
  `${window.location.href.includes("https") ? "wss" : "ws"}://${
    window.location.host
  }/drawWebsockets`
);
ctx.globalCompositeOperation="destination-over";
var click = false;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

window.addEventListener("mousedown", (e) => {
  for (let i = 0; i <= 30; i++) {
    let cool = new coolShape(e.clientX, e.clientY);
    cool.update();
  }
  click = true;
});
window.addEventListener("mouseup", (e) => {
  click = false;
});
window.addEventListener("mousemove", async (e) => {
  console.log(click);
  if (click) {
    let cool = new coolShape(e.clientX, e.clientY);
    cool.update();
    ws.send(JSON.stringify({ content: canvas.toDataURL() }));
  }
});
ws.onmessage = (e) => {
  let img = new Image();
  img.src = JSON.parse(e.data).content;
  ctx.drawImage(img, 0, 0);
};
console.log(ctx);
class coolShape {
  x: number;
  y: number;

  size: number = Math.random() * 100;
  maxSize: number = 20;
  angle: number = Math.random() * 2 * Math.PI;
  speedX: number = Math.random() * 0.2 + 0.1;
  speedY: number = Math.random() * 0.2 + 0.1;
  color:number=30;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public  update() {
    this.x += Math.cos(this.angle) * this.speedX + Math.random();
    this.y += this.speedX + Math.sin(this.angle);
    this.size += Math.random() * 0.1;
    this.angle += Math.random() * 0.1;
    this.color+=5;
    if (this.size < this.maxSize) {
      this.size += Math.random() * 1;
      ctx.save();

      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle =`rgba(${this.color+30},${this.color+10},${this.color+70},0.6s)`;

      ctx.fillRect(0, 0, this.size, this.size);
      ctx.fill();

      ctx.lineWidth=0.2;
      ctx.strokeStyle = `rgba(${this.color},${this.color},${this.color},0.2)`;
      ctx.strokeRect(0, 0, this.size * 2, this.size * 2);
      ctx.lineWidth=0.2;
      ctx.strokeStyle = `rgba(${this.color},${this.color},${this.color},0.2)`;
      ctx.strokeRect(0, 0, this.size * 3, this.size * 3);
      
      ctx.stroke();

      requestAnimationFrame(this.update.bind(this));
      ctx.restore();
    }
  }
}
