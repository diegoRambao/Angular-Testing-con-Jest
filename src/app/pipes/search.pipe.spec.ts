import { Country } from '@app/services/country.service';
import { SearchPipe } from './search.pipe';

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


describe('SearchPipe', () => {
 
  let pipe: SearchPipe;

  beforeEach(() => {
    pipe = new SearchPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Si no se ningun valor debe retornar un array vacio', () => {
    const response = pipe.transform(null, 'abc');
    expect(response.length).toBe(0);
  });

  it('Si no se encuentra ningun valor debe retornar un array vacio', () => {
    const response = pipe.transform(countriesMock, 'abc');
    expect(response.length).toBe(0);
  });

  it('si existe una coincidencia debe retornar el array con los objetos', () => {
    const response = pipe.transform(countriesMock, 'Americas');
    expect(response.length).toBe(2);
    expect(response[0].name).toBe('Brazil');
    expect(response[1].name).toBe('Colombia');
  });
});
