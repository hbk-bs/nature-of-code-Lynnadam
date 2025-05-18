const canvas = document.getElementById("cloudCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class AltocumulusCloud {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.4 + 0.3 * canvas.height; 
    this.numParticles = Math.floor(Math.random() * 60 + 40); 
    this.particles = [];
    this.speed = Math.random() * 1.2 + 0.3; 
    this.alpha = Math.random() * 0.3 + 0.4; 
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < this.numParticles; i++) {
      const particle = {
        x: this.x + Math.random() * 200 - 100, 
        y: this.y + Math.random() * 30 - 15, 
        radius: Math.random() * 2 + 1, 
        speedX: Math.random() * 1.5 + 0.3, 
        speedY: Math.random() * 0.3 + 0.2, 
        alpha: Math.random() * 0.3 + 0.4, 
      };
      this.particles.push(particle);
    }
  }

  draw() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`; 
      ctx.fill();
    }
  }

  update() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.x += particle.speedX; 
      particle.y += particle.speedY; 
      if (particle.x > canvas.width) particle.x = -particle.radius; 
      if (particle.y > canvas.height * 0.7) particle.y = Math.random() * canvas.height * 0.4 + 0.3 * canvas.height; 
    }
  }
}

let clouds = [];
for (let i = 0; i < 4; i++) { 
  clouds.push(new AltocumulusCloud());
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
