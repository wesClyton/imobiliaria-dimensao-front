import { Observable } from 'rxjs';

export interface HttpUpload<UploadOut> {
  upload(type: FormData): Observable<UploadOut>;
}
