import { THREE_COMMAS_API_KEY, THREE_COMMAS_SECRET_KEY } from '@/config/env';
import { ThreeCommasAPI } from '@/core/three-commas-api';

export const threeCommasAPI = new ThreeCommasAPI({
  key: THREE_COMMAS_API_KEY, // Optional if only query endpoints with no security requirement
  secrets: THREE_COMMAS_SECRET_KEY, // Optional
  timeout: 60000, // Optional, in ms, default to 30000
  forcedMode: 'real',
  errorHandler: (response, reject) => {
    // Optional, Custom handler for 3Commas error
    const { error, error_description } = response;
    reject(new Error(error_description ?? error));
  },
});
