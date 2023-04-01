import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: boolean = false;

  constructor() { }

  setLoading(flag: boolean) {
    this.loading = flag;
  }

  getLoading() {
    return this.loading;
  }
}
