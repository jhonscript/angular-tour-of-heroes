import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/Observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/Operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { debounce } from 'rxjs/Operators/debounce';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  searchHero(term: string)
  {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300)
      , distinctUntilChanged()
      , switchMap((term: string) => this.heroService.searchHeroes(term))
    )
  }

}
