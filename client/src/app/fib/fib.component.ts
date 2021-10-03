import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, Observable } from 'rxjs';

import { FibService } from './fib.service';

@Component({
  selector: 'app-fib',
  templateUrl: './fib.component.html',
})
export class FibComponent implements OnInit {
  public fibForm: FormGroup;
  public seenIndexes$: Observable<number[]>;
  public values$: Observable<{}>;

  #seenIndexesSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  #valuesSubject: BehaviorSubject<{}> = new BehaviorSubject<{}>({});

  constructor(
    private _formBuilder: FormBuilder,
    private _fibService: FibService,
  ) {}

  public ngOnInit(): void {
    this.fibForm = this._formBuilder.group({
      index: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^\d+$/g))]),
    })
    this.values$ = this.#valuesSubject.asObservable();
    this.seenIndexes$ = this.#seenIndexesSubject.asObservable();
    this.#getIndexes();
    this.#getValues();
  }

  public onSubmit(): void {
    if (this.fibForm.invalid) {
      return;
    }

    this._fibService
      .postIndex(Number(this.fibForm.value.index))
      .subscribe(() => {
        this.fibForm.reset();
      })
  }

  #getIndexes(): void {
    this._fibService
      .fetchIndexes()
      .subscribe((indexes: number[]) => {
        this.#seenIndexesSubject.next(indexes);
      })
  }

  #getValues(): void {
    this._fibService
      .fetchValues()
      .subscribe((data: {}) => {
        this.#valuesSubject.next(data);
      })
  }
}
