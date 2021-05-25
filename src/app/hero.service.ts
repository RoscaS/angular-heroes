import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  /*------------------------------------------------------------------*\
  |*							              METHODS
  \*------------------------------------------------------------------*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.messages}`);
      return of(result as T);
    };
  }

  public log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  /*------------------------------------------------------------------*\
  |*							              API
  \*------------------------------------------------------------------*/
  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get<Hero[]>(url).pipe(
      tap(x =>
        x.length
          ? this.log(`Found heroes matching "${term}"`)
          : this.log(`No heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  /*------------------------------------------------------------------*\
  |*							              CRUD
  \*------------------------------------------------------------------*/
  public getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched hero id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero id: ${id}`))
    );
  }

  public getHeroes(): Observable<Hero[]> {
    this.log('fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  public updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated hero id: ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Added hero w/ id: ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  public deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  // public getHero(id: number): Observable<Hero> {
  //   const hero = HEROES.find(h => h.id == id)!;
  //   this.messageService.add(`HeroService: fetched hero id: ${id}`);
  //   return of(hero);
  // }

  // public getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //   this.log('fetched heroes');
  //   return heroes;
  // }
}
