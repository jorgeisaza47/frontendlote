import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Lote } from '../../../models/lote.model';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LotesService {

  constructor(private http: HttpClient) { }

  get headers() {
    return {
      headers: {

      }
    }
  }

  getLotes(): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${ base_url }/lotes`);
  }

  createLote(lote: Lote): Observable<Lote> {
    return this.http.post<Lote>(`${ base_url }/lotes`, lote);
  }

  updateLote(id: string, lote: Lote): Observable<Lote> {
    const url = `${ base_url }/lotes/${id}`; // URL para actualizar un lote específico
    return this.http.patch<Lote>(url, lote); // Usamos PUT para actualizar
  }

  getLote(id: string): Observable<Lote> {
    // const url = `${ base_url }/lotes/${ id }`;
    // return this.http.get( url )
    return this.http.get<Lote>(`${base_url}/lotes/${id}`);
  }

  // getLotes() {
  //   const url = `${ base_url }/lotes`;
  //   return this.http.get<{ ok: boolean, lotes: Lote[] }>(url)
  //             .pipe(
  //               map((resp: { ok: boolean, lotes: Lote[] }) => resp.lotes)
  //             );
  // }
}
