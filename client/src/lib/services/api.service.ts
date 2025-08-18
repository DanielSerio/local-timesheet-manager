export interface ApiServiceParams {
  BASE_URL?: string;
  ENDPOINT: string;
}

type BaseRequestInit = Omit<RequestInit, 'body'> & {
  path?: PathType;
  withHeaders?: boolean;
};
type PathType = `/${string}`;

interface NoBodyRequestInit extends BaseRequestInit {
  method: 'GET' | 'DELETE';
  body?: never;
}

interface BodyRequestInit<Type> extends BaseRequestInit {
  method: 'POST' | 'PUT' | 'PATCH';
  body: Type;
}

type RequestOptions<Type> = NoBodyRequestInit | BodyRequestInit<Type>;

export abstract class ApiService {
  protected _BASE_URL: string;
  protected _ENDPOINT: string;
  protected _URL!: string;
  protected _DEFAULT_OPTIONS: Omit<RequestOptions<null>, 'body' | 'method'> = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor({ BASE_URL = 'http://127.0.0.1:3002', ENDPOINT }: ApiServiceParams) {
    this._BASE_URL = BASE_URL;
    this._ENDPOINT = ENDPOINT;
    this.setURL();
  }

  private setURL = () => {
    this._URL = `${this._BASE_URL}${this._ENDPOINT}`;
  };

  private isBodyRequest<Type>(req: RequestOptions<Type>): req is BodyRequestInit<Type> {
    return !!req.body;
  }


  /**
   * Sends a request to a specified URL with customizable options.
   */
  private async request<Type, ResponseType>({ withHeaders, ...init }: RequestOptions<Type>) {
    const { body: _, ...initDefaults } = init;
    const options = {
      ...this._DEFAULT_OPTIONS,
      ...initDefaults
    } as RequestInit;

    if (this.isBodyRequest(init)) {
      options.body = JSON.stringify(init.body!);
    }

    const url = `${this._URL}${init.path ?? ''}`;

    const response = await fetch(url, options);

    if (!response.ok) {
      throw response;
    }

    const data = await response.json() as ResponseType;

    if (withHeaders) {
      return {
        headers: response.headers,
        data
      };
    }

    return data;
  }

  protected GET<ResponseType>(path?: PathType) {
    return this.request<null, ResponseType>({
      method: 'GET',
      path
    });
  }

  protected DELETE<ResponseType>(path?: PathType) {
    return this.request<null, ResponseType>({
      method: 'DELETE',
      path
    });
  }

  protected POST<Body, ResponseType>(body: Body, path?: PathType) {
    return this.request<Body, ResponseType>({
      method: 'POST',
      body,
      path
    });
  }

  protected PUT<Body, ResponseType>(body: Body, path?: PathType) {
    return this.request<Body, ResponseType>({
      method: 'PUT',
      body,
      path
    });
  }

  protected PATCH<Body, ResponseType>(body: Body, path?: PathType) {
    return this.request<Body, ResponseType>({
      method: 'PATCH',
      body,
      path
    });
  }
}