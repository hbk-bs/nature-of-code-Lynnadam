const canvas = document.getElementById("cloudCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class NimbostratusCloud {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.3; 
    this.width = canvas.width;
    this.height = 100 + Math.random() * 50; 
    this.alpha = 0.5 + Math.random() * 0.3; 
    this.speedX = Math.random() * 0.2 + 0.3; 
    this.color = `rgba(50, 50, 50, ${this.alpha})`; 
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height); 
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x -= this.speedX; 
    if (this.x + this.width < 0) {
      this.x = canvas.width; 
    }
  }
}

let clouds = [];
for (let i = 0; i < 3; i++) { 
  clouds.push(new NimbostratusCloud());
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
