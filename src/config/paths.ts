export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  campaigns: {
    path: 'campaigns',
    getHref: () => '/campaigns',
  },
  campaign: {
    path: 'campaigns/:code',
    getHref: (code: string) => `/campaigns/${code}`,
  },
  aboutUs: {
    path: 'about-us',
    getHref: () => '/about-us',
  },

  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    dashboard: {
      path: '',
      getHref: () => '/app',
    },
    campaigns: {
      path: 'campaigns',
      getHref: () => '/app/campaigns',
    },
    campaign: {
      path: 'campaigns/:campaignId',
      getHref: (id: string) => `/app/campaigns/${id}`,
    },
    users: {
      path: 'users',
      getHref: () => '/app/users',
    },
    profile: {
      path: 'profile',
      getHref: () => '/app/profile',
    },
  },
} as const;
