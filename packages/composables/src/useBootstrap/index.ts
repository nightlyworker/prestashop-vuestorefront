import { computed } from '@vue/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

// todo: create factories to implement composables
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBootstrap = () => {
  const context = useVSFContext();

  const result = sharedRef(null, 'bootstrap');

  const loading = sharedRef(false, 'bootstrap-loading');

  const error = sharedRef({
    search: null
  }, 'bootstrap-error');

  const boot = async () => {
    Logger.debug('bootstrap/boot');

    try {
      loading.value = true;
      result.value = await context.$prestashop.api.bootstrap();
      error.value.boot = null;
    } catch (err) {
      error.value.boot = err;
      Logger.error('bootstrap/boot', err);
    } finally {
      loading.value = false;
    }
  };

  // todo: in factories it should return array of typed objects - not raw plain response
  return {
    boot,
    featureProducts: computed(() => result.value.psdata.featuredProductsList),
    slides: computed(() => result.value.psdata.slides),
    banner: computed(() => result.value.psdata.banner),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
