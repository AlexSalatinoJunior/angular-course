import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leaders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dish: Dish;
  dishes: Dish[];
  promotion: Promotion;
  leader: Leader;
  leaders: Leader[];
  dishErrMess: string

  constructor(
    private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') public BaseURL
  ) {}

  ngOnInit() {
    this.dishservice.getDish('0').subscribe((dish) => (this.dish = dish));
    this.leaderservice.getLeaders().then((leaders) => (this.leaders = leaders));
    this.dishservice.getDishes().subscribe((dishes) => (this.dishes = dishes));
    this.promotionservice
      .getFeaturedPromotion()
      .then(promotion => this.promotion = promotion,
      errmess => this.dishErrMess = <any>errmess);
    this.leaderservice
      .getFeaturedLeader()
      .then(leader => this.leader = leader,
      errmess => this.dishErrMess = <any>errmess);
  }
}
