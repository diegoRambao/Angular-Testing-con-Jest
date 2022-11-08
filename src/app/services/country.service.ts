import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from '@src/environments/environment';

export interface Country {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
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

  public getCountriesWithPromise(): Promise<Country[]> {
    return new Promise<Country[]>((resolve) => {
      this.http
        .get<Country[]>(`${environment.apiUrl}/all`)
        .subscribe((data) => {
          resolve(data);
        });
    });
  }
}
