import { Injectable } from '@angular/core';
import { environment as env } from '../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { ReportPDF } from '@app/models/reportPdf';

@Injectable({
  providedIn: 'root'
})
export class ExportFilesService {
  private apiUrl = `${env.api}/exports-files`;

  constructor(private http: HttpClient) { }

  exportToPdf(data: ReportPDF[]) {
    return this.http.post(`${this.apiUrl}/pdf`, data, {
      responseType: 'blob'
    });
  }
}
