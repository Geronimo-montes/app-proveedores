import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export abstract class HeaderOption {
  protected httpClient: HttpClient;
  protected baseURL: string = environment.apiURL;

  constructor(httpClient: HttpClient) { }

  get token(): string {
    return JSON.parse(localStorage.getItem('auth_app_token')).value;
  }

  protected getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }
}
