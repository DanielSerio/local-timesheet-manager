export interface ApiServiceParams {
  BASE_URL?: string;
  ENDPOINT: string;
}
export abstract class ApiService {
  protected _BASE_URL: string;
  protected _ENDPOINT: string;
  protected _URL!: string;

  constructor({ BASE_URL = 'http://127.0.0.1:3002', ENDPOINT }: ApiServiceParams) {
    this._BASE_URL = BASE_URL;
    this._ENDPOINT = ENDPOINT;
    this.setURL();
  }

  private setURL = () => {
    this._URL = `${this._BASE_URL}${this._ENDPOINT}`;
  };
}