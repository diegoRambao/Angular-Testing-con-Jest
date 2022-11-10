import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Country, CountryService } from "./country.service";

const httpClientMock = {
  get: jest.fn()
}

const countriesMock: Country[] = [
  {
    name: 'Brazil',
    capital: 'Brasília',
    population: 212559409,
    region: 'Americas',
    flag: 'https://flagcdn.com/br.svg',
  },
  {
    name: 'Colombia',
    capital: 'Bogotá',
    population: 50882884,
    region: 'Americas',
    flag: 'https://flagcdn.com/co.svg',
  },
  {
    name: 'Japan',
    capital: 'Tokyo',
    population: 125836021,
    region: 'Asia',
    flag: 'https://flagcdn.com/jp.svg',
  },
]

describe('CountryService', () => {
  let service: CountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryService, { provide: HttpClient, useValue: httpClientMock }]
    });

    service = TestBed.inject(CountryService);
    httpClientMock.get.mockReturnValue(of(countriesMock));
  });

  test('Deberia crearse', () => {
    expect(service).toBeTruthy();
  });

  test('El metodo "getCountries" deberia agregar el listado de paises al array de countries', () => {
    service.getCountries();

    expect(httpClientMock.get).toHaveBeenCalled();
    expect(service.countries.getValue().length).toBe(3);
  });

  test('El metodo "getCountriesWithPromise" deberia retornar una promesa de countries', async () => {
    const response = await service.getCountriesWithPromise();

    expect(httpClientMock.get).toHaveBeenCalled();
    expect(response.length).toBe(3);
  });
});