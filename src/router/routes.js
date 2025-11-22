const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'en/for-sale',
        name: 'rForSaleSearch',
        component: () => import('components/SearchView.vue')
      },
      {
        path: 'en/property/:id',
        name: 'rPropertyDetail',
        component: () => import('components/ListingView.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
