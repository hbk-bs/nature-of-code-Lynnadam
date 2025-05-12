const canvas = document.getElementById("cloudCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Klasse für Nimbostratuswolken
class NimbostratusCloud {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.3; // Oberer Bereich
    this.width = canvas.width;
    this.height = 100 + Math.random() * 50; // Wolkenhöhe
    this.alpha = 0.5 + Math.random() * 0.3; // Transparenz
    this.speedX = Math.random() * 0.2 + 0.3; // Langsame Bewegung in X-Richtung
    this.color = `rgba(50, 50, 50, ${this.alpha})`; // Dunkelgraue Farbe
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height); // Wolken als rechteckige Schicht
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x -= this.speedX; // Bewegung nach links
    if (this.x + this.width < 0) {
      this.x = canvas.width; // Wenn die Wolke den Bildschirm verlässt, erscheint sie wieder rechts
    }
  }
}

let clouds = [];
for (let i = 0; i < 3; i++) { // Weniger Wolken für dichte, starke Schicht
  clouds.push(new NimbostratusCloud());
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
