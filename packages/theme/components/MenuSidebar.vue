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
          v-for="(category, key) in categories"
          :key="key"
          :title="category.title"
        >
          <SfList>
            <SfListItem v-for="(subcategory, key) in category.subcategories" :key="key">
              <SfMenuItem :label="subcategory.title"></SfMenuItem>
            </SfListItem>
          </SfList>
        </SfMegaMenuColumn>
        <SfMegaMenuColumn title="Featured" class="sf-mega-menu-column--pined-content-on-mobile sf-mega-menu-column--hide-header-on-mobile sb-mega-menu__featured">
          <div class="sb-mega-menu__banners">
            <SfBanner
              v-for="(banner, key) in banners"
              :key="key"
              :title="banner.title"
              :subtitle="banner.subtitle"
              :image="banner.pictures"
              class="sb-mega-menu__banner"
            />
          </div>
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
  SfImage
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
    SfImage
  },
  setup() {
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
      menuItems
    };
  },
  data() {
    return {
      categories: [
        {
          title: "Clothing",
          subcategories: [
            { title: "Skirts" },
            { title: "Sweaters" },
            { title: "Dresses" },
            { title: "TShirts" },
            { title: "Pants" },
            { title: "Underwear" },
            { title: "Jackets" },
            { title: "Blouses" },
          ],
        },
        {
          title: "Accesories",
          subcategories: [
            { title: "Bags & Purses" },
            { title: "Belts" },
            { title: "Gloves" },
            { title: "Hats" },
          ],
        },
        {
          title: "Shoes",
          subcategories: [
            { title: "Boots" },
            { title: "Heels" },
            { title: "Flat shoes" },
            { title: "Loafers" },
            { title: "Sandals" },
            { title: "Slippers" },
            { title: "Trainers" },
          ],
        },
      ],
      banners: [
        {
          title: "THE OFFICE LIFE",
          subtitle: "T-shirts",
          pictures: {
            mobile: "/assets/storybook/SfMegaMenu/bannerSandals.jpg",
            desktop: "/assets/storybook/SfMegaMenu/bannerSandals.jpg",
          },
        },
        {
          title: "ECO SANDALS",
          subtitle: "T-shirts",
          pictures: {
            mobile: "/assets/storybook/SfMegaMenu/bannerBeachBag.jpg",
            desktop: "/assets/storybook/SfMegaMenu/bannerBeachBag.jpg",
          },
        },
      ],
    };
  },
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
</style>
