import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Feedback } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(baseURL + 'feedback')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeedback(id: string): Observable<Feedback> {
    return this.http.get<Feedback>(baseURL + 'feedback/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getFeedbackIds(): Observable<number[] | any> {
    return this.getFeedbacks().pipe(map(feedbacks => feedbacks.map(feedback => feedback.id)))
      .pipe(catchError(error => error));
  }
  putFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(baseURL + 'feedback/', feedback)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
