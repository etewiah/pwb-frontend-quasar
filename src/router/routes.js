const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/en',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {
        path: 'for-sale',
        name: 'rForSaleSearch',
        component: () => import('pages/SearchView.vue')
      },
      {
        path: 'for-sale/:listingSlug',
        name: 'rForSaleListing',
        component: () => import('pages/ListingView.vue')
      },
      {
        path: 'for-rent',
        name: 'rForRentSearch',
        component: () => import('pages/SearchView.vue')
      },
      {
        path: 'for-rent/:listingSlug',
        name: 'rForRentListing',
        component: () => import('pages/ListingView.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
