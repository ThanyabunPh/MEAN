export interface Environment {
  production: boolean;
  uri_api: string;
}

export const environment: Environment = {
  production: true,
  uri_api: 'https://localhost:3000',
};
