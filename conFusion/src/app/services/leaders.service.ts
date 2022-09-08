import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  getLeaders(): Promise<Leader[]> {
    return firstValueFrom(of(LEADERS));
  }

  getLeader(id: String): Promise<Leader> {
    return firstValueFrom(
      of(LEADERS.filter((leader) => leader.id === id)[0])
    );
  }

  getFeaturedLeader(): Promise<Leader> {
    return firstValueFrom(
      of(LEADERS.filter((leader) => leader.featured)[0])
    );
  }
  constructor() {}
}
