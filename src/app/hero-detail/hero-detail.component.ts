import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  public hero: Hero | undefined;
  detailToggel = true;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  public ngOnInit(): void {
    this.getHero();
  }

  public goBack(): void {
    this.location.back();
  }

  public save(): void {
    if (this.hero)
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

  private getHero(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  headerClick() {
    console.log('#########');
    console.log(this.detailToggel);
    console.log('#########');

    this.detailToggel = !this.detailToggel;
  }
}
