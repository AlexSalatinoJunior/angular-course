import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  getPromotions(): Promise<Promotion[]> {
    return of(PROMOTIONS).toPromise();
  }

  getPromotion(id: String): Promise<Promotion> {
    return of(PROMOTIONS.filter((promotion) => promotion.id === id)[0])
      .toPromise();
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0])
      .toPromise();
  }
  constructor() {}
}
