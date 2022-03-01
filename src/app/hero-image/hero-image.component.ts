import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { createCanvas } from 'canvas';
import { Subject } from 'rxjs';
import { Hero } from '../models/hero';
import { Utils } from '../models/utils';

@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.scss']
})
export class HeroImageComponent implements OnChanges {

  @ViewChild('image') image: ElementRef | null = null;

  @Input() width = 64;
  @Input() height = 64;
  @Input() hero: Hero | null = null;

  heroImg = new Subject();
  
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.heroImg = new Subject();
    this.draw();
  }

  async draw() {
    const width = 192;
    const height = 192;
  
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    if (this.hero) {

      const [hero, fact, engrave, frame, si, fi, crown] = await Promise.all([
        Utils.loadImage(this.hero.getImage()),
        Utils.loadImage('assets/factions/' + this.hero.faction + '.png'),
        Utils.loadImage('assets/heroes-star/' + this.getEngraveImageName(this.hero.engrave) + '.png'),
        Utils.loadImage('assets/heroes-frame/' + this.getHeroFrame(this.hero.ascend) + '.png'),
        Utils.loadImage('assets/heroes-signature/' + this.getSiImageName(this.hero.si) + '.png'),
        Utils.loadImage('assets/heroes-furniture/' + this.getFiImageName(this.hero.fi) + '.png'),
        Utils.loadImage('assets/heroes-furniture/' + this.getFiCrownImageName(this.hero.fi) + '.png')
      ]);

      ctx.beginPath();

      if (hero) ctx.drawImage(hero, 21, 21, 150, 150);

      const stars = this.hero.ascend - 7;

      if (stars > 0) {
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = "#000000";
        ctx.fillRect(21, 134, 150, 42);
        ctx.globalAlpha = 1;
  
        for (let i = 0; i < stars; i += 1) {
          const x = 10 + 84 - stars * 11.5 + i * 23 - 6;
  
          if (engrave) ctx.drawImage(engrave, x, 137, 29, 29);
        }
      }

      ctx.clearRect(162, 147, 50, 50);
      ctx.clearRect(147, 162, 50, 50);

      if (frame) ctx.drawImage(frame, 12, 12, 168, 168);
      if (fact) ctx.drawImage(fact, 20, 21, 42, 42);
      if (fi) ctx.drawImage(fi, 19, 72, 42.5, 32.3);
      if (si) ctx.drawImage(si, 1.5, 4.5, 79.9, 90.1);
      if (crown) ctx.drawImage(crown, 24, 4, 35.7, 22.1);
    }

    if (this.image) {
      this.image.nativeElement.width = this.width;
      this.image.nativeElement.height = this.height;
    }
    this.heroImg.next(canvas.toDataURL())
    this.heroImg.complete();
  }

  private getFiImageName(siLevel: number): string {
    if (siLevel === 36) return "36";
    if (siLevel >= 9) return "9";
    if (siLevel >= 3) return "3";
  
    return "x";
  }
  
  private getFiCrownImageName(siLevel: number): string {
    if (siLevel === 36) return "crown";
  
    return "x";
  }

  private getEngraveImageName(engrave: number | undefined): number {
    if (engrave === undefined) return 0;
  
    let engraveNumber = 0;
    if (engrave >= 80) {
      engraveNumber = 80;
    } else if (engrave >= 60) {
      engraveNumber = 60;
    } else if (engrave >= 30) {
      engraveNumber = 30;
    }
  
    return engraveNumber;
  }

  private getHeroFrame(ascendLevel: number): string {
    if (ascendLevel === 1) return `elite`;
    if (ascendLevel === 2) return `elite-p`;
    if (ascendLevel === 3) return `legendary`;
    if (ascendLevel === 4) return `legendary-p`;
    if (ascendLevel === 5) return `mythic`;
    if (ascendLevel === 6) return `mythic-p`;
    if (ascendLevel > 6) return `ascend`;
  
    return `none`;
  }

  private getSiImageName(siLevel: number): string {
    if (siLevel === 40) return "40";
    if (siLevel >= 30) return "30";
    if (siLevel >= 20) return "20";
    if (siLevel >= 10) return "10";
    if (siLevel >= 0) return "0";
  
    return "x";
  }

}
