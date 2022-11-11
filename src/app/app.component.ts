import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Country, CountryService } from './services/country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  countries: Observable<Country[]>;
  searchValue: string = '';
  constructor(private countryService: CountryService) {
    this.countries = this.countryService.countries.asObservable();
  }

  ngOnInit(): void {
    this.countryService.getCountries();
  }
}
