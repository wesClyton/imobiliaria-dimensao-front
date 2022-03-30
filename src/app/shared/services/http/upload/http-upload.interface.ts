import { Observable } from 'rxjs';

export interface HttpUpload<UploadOut> {
  post(formData: FormData): Observable<UploadOut>;
  update(id: string, formData: FormData): Observable<UploadOut>;
}
