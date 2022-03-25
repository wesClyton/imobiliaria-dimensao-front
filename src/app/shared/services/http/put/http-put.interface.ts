import { Observable } from 'rxjs';

export interface HttpPut<PutIn, PutOut> {
  put(type: PutIn): Observable<PutOut>;
}
