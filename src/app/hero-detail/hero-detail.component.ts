import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  @Input() public hero?: Hero;

  constructor(
    private heroService: HeroService,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  /*------------------------------------------------------------------*\
  |*							              HOOKS
  \*------------------------------------------------------------------*/
  public ngOnInit(): void {
    this.getHero();
  }
  /*------------------------------------------------------------------*\
  |*							              METHODS
  \*------------------------------------------------------------------*/
  private getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
  }

  public save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }

  public goBack(): void {
    this.location.back();
  }
}
