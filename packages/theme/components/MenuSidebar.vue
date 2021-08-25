<template>
  <div id="menu">
    <SfSidebar
      v-e2e="'sidebar-cart'"
      :visible="isMenuSidebarOpen"
      class="sf-sidebar--right"
    >
      <SfMegaMenu
        title='Menu'
        :visible="true"
        class="sb-mega-menu"
        @close="toggleMenuSidebar">
        <SfMegaMenuColumn
          v-for="(item, key) in menuItems"
          :key="key"
          :title="item.label"
        >
          <SfImage :alt="item.label" :src="item.image.src"/>
          <SfList>
            <SfListItem v-for="(subitem, key) in item.children" :key="key">
              <SfMenuItem @click='handleItemClick(localePath("/c/"+subitem.slug))' :label="subitem.label"></SfMenuItem>
            </SfListItem>
          </SfList>
        </SfMegaMenuColumn>
      </SfMegaMenu>
      <template #content-bottom>
        <transition name="sf-fade">
          <div>
            <SfButton
              class="sf-button--full-width color-primary"
              @click="toggleMenuSidebar"
            >{{ $t('Close') }}</SfButton
            >
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfMegaMenu,
  SfMenuItem,
  SfList,
  SfSidebar,
  SfHeading,
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfLink
} from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import { useCart, useUser, cartGetters, useBootstrap } from '@vue-storefront/prestashop';
import { useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'Cart',
  components: {
    SfMegaMenu,
    SfMenuItem,
    SfList,
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    SfLink
  },
  setup(props, { root }) {
    const { toggleMenuSidebar, isMenuSidebarOpen, toggleCartSidebar } = useUiState();
    const { cart, removeItem, updateItemQty, load: loadCart } = useCart();
    const { isAuthenticated } = useUser();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));

    const {
      menuItems: menuItems
    } = useBootstrap();

    onSSR(async () => {
      await loadCart();
    });

    const handleItemClick = (link) => {
      toggleMenuSidebar();
      return root.$router.push(link);
    };

    return {
      isAuthenticated,
      products,
      removeItem,
      updateItemQty,
      isMenuSidebarOpen,
      toggleMenuSidebar,
      toggleCartSidebar,
      totals,
      totalItems,
      cartGetters,
      menuItems,
      handleItemClick
    };
  }
};
</script>

<style lang="scss">
#menu {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
}

.sf-bar.smartphone-only{
  display: none !important;
}

#menu .sf-sidebar__content{
  padding: 0px !important;
}

#menu .sf-sidebar__top{
  padding: 0px !important;
}

.sf-image.sf-image-loaded{
  width: 100% !important;
}
</style>
