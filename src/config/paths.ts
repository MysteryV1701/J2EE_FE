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
  campaignCategories: {
    path: 'campaigns/category/:id',
    getHref: (id: number) => `/campaigns/category/${id}`,
  },
  donation_result: {
    path: 'donation-status',
    getHref: (vnp_ResponseCode: string) => `/donation-status?vnp_ResponseCode=${vnp_ResponseCode}`,
  },
  donations: {
    path: 'donations',
    getHref: () => `/donations`,
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
      path: '/app/campaigns',
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
    category: {
      path: 'categories',
      getHref: () => '/app/categories',
    },
    recipient: {
      path: 'recipients',
      getHref: () => '/app/recipients',
    },
    financialReport: {
      path: 'financial-reports',
      getHref: () => '/app/financial-reports',
    }
  },
} as const;
