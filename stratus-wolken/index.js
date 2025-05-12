const canvas = document.getElementById("cloudCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Cloud {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.6;
    this.size = Math.random() * 80 + 50;
    this.speed = Math.random() * 0.5 + 0.2;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.speed;
    if (this.x - this.size > canvas.width) {
      this.x = -this.size;
      this.y = Math.random() * canvas.height * 0.6;
    }
  }
}

let clouds = [];
for (let i = 0; i < 30; i++) {
  clouds.push(new Cloud());
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
