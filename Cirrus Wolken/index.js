const canvas = document.getElementById("cloudCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class CirrusCloud {
  constructor() {
    // Cirruswolken sind in großer Höhe
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.3; // Hohe Position
    this.numParticles = Math.floor(Math.random() * 60 + 40); // Anzahl der Partikel
    this.particles = []; // Array für die Partikel
    this.speed = Math.random() * 1.5 + 0.5; // Geschwindigkeit der Bewegung
    this.angle = Math.random() * Math.PI * 2; // Zufällige Ausrichtung
    this.alpha = Math.random() * 0.2 + 0.3; // Transparenz der Wolke
    this.createParticles();
  }

  // Partikel erstellen, die die Wolke bilden
  createParticles() {
    for (let i = 0; i < this.numParticles; i++) {
      const particle = {
        x: this.x + Math.random() * 200 - 100, // Zufällige Position innerhalb der Wolke
        y: this.y + Math.random() * 50 - 25,
        radius: Math.random() * 2 + 0.5, // Größere Partikel als vorher
        speedX: Math.random() * 1.5 + 0.5, // Zufällige Geschwindigkeit in X-Richtung
        speedY: Math.random() * 0.3 + 0.1, // Langsame Geschwindigkeit in Y-Richtung
        alpha: Math.random() * 0.2 + 0.3, // Transparenz
      };
      this.particles.push(particle);
    }
  }

  // Partikel zeichnen
  draw() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`; // Weiße, durchsichtige Partikel
      ctx.fill();
    }
  }

  // Partikel bewegen
  update() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.x += particle.speedX; // Bewegung in X-Richtung
      particle.y += particle.speedY; // Bewegung in Y-Richtung
      if (particle.x > canvas.width) particle.x = -particle.radius; // Wenn sie den Rand erreichen, von links wieder erscheinen
      if (particle.y > canvas.height * 0.3) particle.y = Math.random() * canvas.height * 0.3; // Neue Position in der Höhe
    }
  }
}

let clouds = [];
for (let i = 0; i < 5; i++) { // Weniger Wolken für einen subtilen Effekt
  clouds.push(new CirrusCloud());
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
