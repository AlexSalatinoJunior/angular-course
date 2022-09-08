import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leaders.service';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  leader: Leader;

  constructor(private leaderService: LeaderService) {}

  ngOnInit() {
    this.leaderService
      .getFeaturedLeader()
      .then((leader) => (this.leader = leader));
    this.leaderService.getLeaders().then((leaders) => (this.leaders = leaders));
  }
}
