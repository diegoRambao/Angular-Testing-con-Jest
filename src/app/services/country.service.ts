import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';

export interface Country {
  name: string;
  flag: Array<string>;
  population: number;
  region: string;
  capital: string;
  nativeName: string;
  subregion: string;
  topLevelDomain: Array<string>;
  border: Array<string>;
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  public contries: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>(
    []
  );

  constructor(private http: HttpClient) {}

  public getCountries(): void {
    this.http
      .get<Country[]>(`${environment.apiUrl}/all`)
      .subscribe((countries: Country[]): void => {
        this.contries.next(countries);
      });
  }
}
