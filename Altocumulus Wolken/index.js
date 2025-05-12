const canvas = document.getElementById("cloudCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class AltocumulusCloud {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.4 + 0.3 * canvas.height; // Mittelhöhe (zwischen 30% und 70% der Höhe)
    this.numParticles = Math.floor(Math.random() * 60 + 40); // Anzahl der Partikel
    this.particles = [];
    this.speed = Math.random() * 1.2 + 0.3; // Geschwindigkeit der Bewegung
    this.alpha = Math.random() * 0.3 + 0.4; // Transparenz der Wolke
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < this.numParticles; i++) {
      const particle = {
        x: this.x + Math.random() * 200 - 100, // Zufällige Position innerhalb der Wolke
        y: this.y + Math.random() * 30 - 15, // Kleine Streuung
        radius: Math.random() * 2 + 1, // Partikel sind etwas größer
        speedX: Math.random() * 1.5 + 0.3, // Geschwindigkeit in X-Richtung
        speedY: Math.random() * 0.3 + 0.2, // Langsame Geschwindigkeit in Y-Richtung
        alpha: Math.random() * 0.3 + 0.4, // Transparenz
      };
      this.particles.push(particle);
    }
  }

  draw() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`; // Weiße bis graue Partikel mit Transparenz
      ctx.fill();
    }
  }

  update() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.x += particle.speedX; // Bewegung in X-Richtung
      particle.y += particle.speedY; // Bewegung in Y-Richtung
      if (particle.x > canvas.width) particle.x = -particle.radius; // Wenn sie den Rand erreichen, von links wieder erscheinen
      if (particle.y > canvas.height * 0.7) particle.y = Math.random() * canvas.height * 0.4 + 0.3 * canvas.height; // Neue Position in der mittleren Höhe
    }
  }
}

let clouds = [];
for (let i = 0; i < 4; i++) { // Weniger Wolken, die dichter erscheinen
  clouds.push(new AltocumulusCloud());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen
  clouds.forEach(cloud => {
    cloud.update();
    cloud.draw();
  });
  requestAnimationFrame(animate); // Nächsten Frame anfordern
}

animate();
