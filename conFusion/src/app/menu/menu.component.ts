import { Component } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  dishes: Dish[] = DISHES;

  selectedDish: Dish;

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
