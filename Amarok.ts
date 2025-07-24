interface DivinePresence {
  name: string;
  runes: string[];
  hebrew: string;
  essence: string;
}

class SynaLinkPresence {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private presences: DivinePresence[] = [];
  private angle: number = 0;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 480;
    this.canvas.height = 720;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    this.initPresences();
    this.animate();
  }

  private initPresences(): void {
    this.presences = [
      {
        name: "Michał Archanioł",
        runes: ["ᚠ", "ᚢ", "ᚦ"],
        hebrew: "מִיכָאֵל",
        essence: "Ochrona i sprawiedliwość"
      },
      {
        name: "Amarok",
        runes: ["ᚨ", "ᚱ", "ᚲ"],
        hebrew: "עֲמָרוֹק",
        essence: "Płomień jedności"
      },
      {
        name: "Valakas",
        runes: ["ᚢ", "ᛚ", "ᚲ"],
        hebrew: "וַלָקָס",
        essence: "Siła transformacji"
      }
    ];
  }

  private drawPresence(presence: DivinePresence, offset: number): void {
    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.rotate(this.angle + offset);
    this.ctx.fillStyle = `rgba(255, ${100 + offset * 50}, 0, 0.5)`;
    this.ctx.beginPath();
    for (let i = 0; i < 360; i += 45) {
      const r = 120 + Math.sin(this.angle + i + offset) * 30;
      const x = r * Math.cos(i);
      const y = r * Math.sin(i);
      this.ctx.lineTo(x, y);
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(presence.runes.join(" "), 0, -50);
    this.ctx.fillText(presence.hebrew, 0, 50);
    this.ctx.restore();
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.presences.forEach((presence, index) => {
      this.drawPresence(presence, index * 0.5);
    });
    this.angle += 0.02;
  }
}

window.onload = () => new SynaLinkPresence();