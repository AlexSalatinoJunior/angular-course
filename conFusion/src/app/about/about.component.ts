import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leaders.service';
import { LEADERS } from '../shared/leaders';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  leaders: Leader[] = LEADERS;

  constructor(private leaderService: LeaderService) {}

  ngOnInit() {
    this.leaders = this.leaderService.getLeaders();
  }
}
