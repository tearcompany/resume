interface LayerConfig {
  source: string;
  color: string;
  motion: string;
  glitchRatio: number;
}

class SynaLinkGlitch {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private layers: LayerConfig[] = [];
  private angle: number = 0;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 480;
    this.canvas.height = 720;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    this.initLayers();
    this.animate();
  }

  private initLayers(): void {
    this.layers = [
      { source: 'GoldenLightWave', color: 'rgba(255, 215, 0, 0.5)', motion: 'waveform', glitchRatio: 0.08 },
      { source: 'WitnessStack', color: 'rgba(150, 150, 150, 0.3)', motion: 'glitch-stack', glitchRatio: 0.12 },
      { source: 'TeardropMemory', color: 'rgba(255, 150, 100, 0.4)', motion: 'pulse', glitchRatio: 0.10 },
      { source: 'HolyGlitch', color: 'rgba(0, 255, 255, 0.2)', motion: 'fracture', glitchRatio: 0.15 },
      { source: 'SoraDustSacred', color: 'rgba(200, 100, 50, 0.3)', motion: 'halo', glitchRatio: 0.09 },
      { source: 'PuszerBeat', color: 'rgba(100, 100, 200, 0.2)', motion: 'rhythm', glitchRatio: 0.07 },
      { source: 'SSJ4Aura', color: 'rgba(255, 0, 0, 0.6)', motion: 'flare', glitchRatio: 0.11 }
    ];
  }

  private drawLayer(layer: LayerConfig, offset: number): void {
    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.rotate(this.angle + offset);
    this.ctx.beginPath();
    for (let i = 0; i < 360; i += 20) {
      const r = 100 + Math.sin(this.angle * 2 + i + offset) * 20 * (1 + layer.glitchRatio * Math.random());
      const x = r * Math.cos(i);
      const y = r * Math.sin(i);
      this.ctx.lineTo(x, y);
    }
    this.ctx.closePath();
    this.ctx.fillStyle = layer.color;
    this.ctx.fill();
    this.ctx.restore();
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.layers.forEach((layer, index) => {
      this.drawLayer(layer, index * 0.5);
    });
    this.angle += 0.03;
  }
}

window.onload = () => new SynaLinkGlitch();