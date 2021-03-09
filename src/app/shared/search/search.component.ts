import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSearchTermChanged: EventEmitter<string> = new EventEmitter<string>();
  searchTerm: FormControl = new FormControl();

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.searchTerm
      .valueChanges
      .pipe(debounceTime(500))
      .subscribe((term: string) => {
        this.onSearchTermChanged.emit(term);
      });
  }

  clearSearchTerm(): void {
    this.searchTerm.setValue('');
  }
}
