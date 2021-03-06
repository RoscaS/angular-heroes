import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}
  /*------------------------------------------------------------------*\
  |*							              HOOKS
  \*------------------------------------------------------------------*/
  public ngOnInit(): void {
    this.getHeroes();
  }
  /*------------------------------------------------------------------*\
  |*							              METHODS
  \*------------------------------------------------------------------*/
  private getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(heroes => (this.heroes = heroes.slice(1, 5)));
  }
}
