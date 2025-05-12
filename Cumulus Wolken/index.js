const canvas = document.getElementById("cloudCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class StratusCloud {
  constructor() {

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.3 + 0.2 * canvas.height;
    this.width = Math.random() * 300 + 500; 
    this.height = Math.random() * 50 + 30; 
    this.speed = Math.random() * 0.2 + 0.1;
    this.color = "rgba(169, 169, 169, 0.8)"; 
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.speed;
    if (this.x - this.width / 2 > canvas.width) {
      this.x = -this.width / 2; 
      this.y = Math.random() * canvas.height * 0.3 + 0.2 * canvas.height;
    }
  }
}

let clouds = [];
for (let i = 0; i < 10; i++) {
  clouds.push(new StratusCloud());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  clouds.forEach(cloud => {
    cloud.update();
    cloud.draw();
  });
  requestAnimationFrame(animate);
}

animate();
