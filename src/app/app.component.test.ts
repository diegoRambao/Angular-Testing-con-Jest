import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CountryService } from './services/country.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './pipes/search.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { countriesMock } from '@src/mocks/country.mock';
import { By } from '@angular/platform-browser';

const countryServiceMock = {
  getCountries: jest.fn(),
  countries: new BehaviorSubject(countriesMock)
};

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        SearchPipe
      ],
      providers: [{ provide: CountryService, useValue: countryServiceMock } ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  test('deberia crear la app', (done: jest.DoneCallback) => {
    expect(component).toBeTruthy();
    component.countries.subscribe(data => {
      expect(data.length).toBe(3);
      done();
    });
  });

  test('deberia llamar el metodo getCountries', () => {
    component.ngOnInit();
    expect(countryServiceMock.getCountries).toHaveBeenCalledTimes(1);
  });

  test('deberia tener 3 elementos app-card', () => {
    fixture.detectChanges();

    const appCardsElement = fixture.debugElement.queryAll(By.css('app-card'));
    expect(appCardsElement.length).toBe(3);
  });

  test('deberia hacer la busqueda de los paises cuando input cambia', () => {
    component.searchValue = 'colombia';

    fixture.detectChanges();

    const appCardsElement = fixture.debugElement.queryAll(By.css('app-card'));
    expect(appCardsElement.length).toBe(1);
  });
});
