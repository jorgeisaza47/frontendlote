import { Aguacate } from './../../../models/aguacate.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AguacateService {

  constructor(private http: HttpClient) { }

  get headers() {
    return {
      headers: {

      }
    }
  }

  getAguacates(): Observable<Aguacate[]> {
    return this.http.get<Aguacate[]>(`${ base_url }/aguacate`);
  }

  createLote(aguacate: Aguacate): Observable<Aguacate> {
    return this.http.post<Aguacate>(`${ base_url }/aguacate`, aguacate);
  }

  updateAguacate(id: string, aguacate: Aguacate): Observable<Aguacate> {
    const url = `${ base_url }/aguacate/${id}`; // URL para actualizar un lote específico
    return this.http.patch<Aguacate>(url, aguacate); // Usamos PUT para actualizar
  }

  getLote(id: string): Observable<Aguacate> {
    // const url = `${ base_url }/lotes/${ id }`;
    // return this.http.get( url )
    return this.http.get<Aguacate>(`${base_url}/aguacate/${id}`);
  }

  // getLotes() {
  //   const url = `${ base_url }/lotes`;
  //   return this.http.get<{ ok: boolean, lotes: Lote[] }>(url)
  //             .pipe(
  //               map((resp: { ok: boolean, lotes: Lote[] }) => resp.lotes)
  //             );
  // }
}
