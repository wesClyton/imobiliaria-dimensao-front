import { Observable } from 'rxjs';

export interface HttpUpload<UploadOut> {
  upload(id: string, formData: FormData): Observable<UploadOut>;
}
