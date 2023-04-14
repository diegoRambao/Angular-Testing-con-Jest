import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { CountryService } from "./country.service";
import { countriesMock } from "@src/mocks/country.mock";

const httpClientMock = {
  get: jest.fn()
}

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