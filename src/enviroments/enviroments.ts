// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.ts`.
// The list of file replacements can be found in `angular.json`.
const host = 'http://localhost:5000';
export const Environment = {
  production: false,
  backendUrl: host,
  api: host + '/api/v1',
};

