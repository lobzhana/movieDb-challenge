import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CountryModel,
  LanguageModel,
  MovieFilterModel,
  StudioModel,
} from 'src/app/core/movies/models';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
})
export class SearchFiltersComponent implements OnInit {
  @Input() languages: LanguageModel[];
  @Input() countries: CountryModel[];
  @Input() studios: StudioModel[];
  @Input() years: number[];

  @Output() apply = new EventEmitter<MovieFilterModel>();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.createFormSchema();
  }

  createFormSchema(): FormGroup {
    return this.fb.group({
      searchValue: [],
      availableIn: [],
      years: [],
      countries: [],
      studios: [],
      imdb: this.fb.group({
        from: [],
        to: [],
      }),
    });
  }

  applyFilters(): void {
    if (!this.filterForm.valid) {
      return;
    }

    this.apply.emit(this.filterForm.value);
  }

  clearFilters(): void {
    this.filterForm.reset();
  }
}
