import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { firstValueFrom, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  getDishes(): Promise<Dish[]> {
    return firstValueFrom(of(DISHES).pipe(delay(2000)));
  }

  getDish(id: string): Promise<Dish> {
    return firstValueFrom(
      of(DISHES.filter((dish) => dish.id === id)[0]).pipe(delay(2000))
    );
  }

  getFeaturedDish(): Promise<Dish> {
    return firstValueFrom(
      of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000))
    );
  }
  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map((dish) => dish.id));
  }
  constructor() {}
}
