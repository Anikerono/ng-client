import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  //baseUrl: String = 'http://localhost:9000';
  baseUrl: String = 'https://kinetixlabs.xyz';
  constructor() {}
}
