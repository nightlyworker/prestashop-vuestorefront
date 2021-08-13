import { apiClientFactory } from '@vue-storefront/core';
import type { Setttings, Endpoints } from './types';
import axios from 'axios';

const onCreate = (settings) => {
  const client = axios.create({
    baseURL: settings.api.url
  });

  return {
    config: settings,
    client
  };
};

const { createApiClient } = apiClientFactory<Setttings, Endpoints>({
  onCreate,
  api: {

  }
});

export {
  createApiClient
};
