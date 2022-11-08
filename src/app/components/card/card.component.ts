import { Component, Input } from '@angular/core';

import { Country } from 'src/app/services/country.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() country!: Country;
}
