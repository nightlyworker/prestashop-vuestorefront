<template>
  <SfBottomNavigation class="navigation-bottom smartphone-only">
    <nuxt-link to="/">
      <SfBottomNavigationItem :class="$route.path == '/' ? 'sf-bottom-navigation__item--active' : ''" icon="home" size="20px" label="Home"/>
    </nuxt-link>
    <SfBottomNavigationItem icon="menu" size="20px" label="Menu" @click="toggleMenuSidebar"/>
    <SfBottomNavigationItem
      label="Basket"
      icon="add_to_cart"
      @click="toggleCartSidebarDemo"
    >
      <template #icon>
        <SfCircleIcon aria-label="Add to cart">
          <SfIcon
            icon="add_to_cart"
            color="white"
            size="25px"
            :style="{margin: '0 0 0 -2px'}"
          />
        </SfCircleIcon>
      </template>
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useUser } from '@vue-storefront/prestashop';

export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon
  },
  setup(props, { root }) {
    const { toggleMenuSidebar, toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = useUiState();
    const { isAuthenticated } = useUser();

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }
      toggleLoginModal();
    };

    const toggleCartSidebarDemo = () => {
      // eslint-disable-next-line no-alert
      alert('Cart functionality will be added');
    };

    return {
      toggleMenuSidebar,
      toggleWishlistSidebar,
      toggleCartSidebar,
      handleAccountClick,
      toggleCartSidebarDemo
    };
  }
};
</script>
<style lang="scss" scoped>
.navigation-bottom {
  --bottom-navigation-z-index: 3;
}
</style>
