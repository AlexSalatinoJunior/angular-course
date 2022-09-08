import { Component, Inject, OnInit } from '@angular/core';
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
  errMess: string

  constructor(private leaderService: LeaderService,
  @Inject('BaseURL') public BaseURL) {}

  ngOnInit() {
    this.leaderService
      .getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
      errmess => this.errMess = <any>errmess);
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders,
      errmess => this.errMess = <any>errmess);
  }
}
