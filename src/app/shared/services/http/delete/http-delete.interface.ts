import { Observable } from 'rxjs';

export interface HttpDelete {
  delete(id: string): Observable<void>;
}
