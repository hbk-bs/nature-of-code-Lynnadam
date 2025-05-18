const canvas = document.getElementById("cloudCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let clouds = [];
let mode = "day";


const backgrounds = {
  day: "#87ceeb",
  sunset: "#f7d7ca",  
  night: "#141830"
};


const sunsetColors = [
  "rgba(255, 200, 180, 0.5)",  
  "rgba(255, 180, 150, 0.4)",
  "rgba(255, 160, 140, 0.3)"
];

const cloudColors = {
  day: "rgba(255, 255, 255, 0.8)",
  sunset: sunsetColors,
  night: "rgba(180, 180, 180, 0.6)"
};

class Cloud {
  constructor(x, y, color = null) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 20 + 10; 
    this.speed = Math.random() * 0.5 + 0.2;
    this.color = color || getCloudColor();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.speed;
    if (this.x - this.size > canvas.width) {
      this.x = -this.size;
      this.y = Math.random() * canvas.height; 
    }
  }
}

function getCloudColor() {
  if (mode === "sunset") {
    const options = cloudColors.sunset;
    return options[Math.floor(Math.random() * options.length)];
  }
  return cloudColors[mode];
}

function clearBackground() {
  ctx.fillStyle = backgrounds[mode];
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  
  clouds.forEach(cloud => {
    cloud.update();
    cloud.draw();
  });

  requestAnimationFrame(animate);
}

clearBackground();

canvas.addEventListener("click", (e) => {
  for (let i = 0; i < 5; i++) {
    const offsetX = Math.random() * 20 - 10;
    const offsetY = Math.random() * 20 - 10;
    
    const color = getCloudColor();
    clouds.push(new Cloud(e.clientX + offsetX, e.clientY + offsetY, color));
  }
});


document.getElementById("modeSelect").addEventListener("change", (e) => {
  mode = e.target.value;
  clearBackground();
});

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  clearBackground();
});
