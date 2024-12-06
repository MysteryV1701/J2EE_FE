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
  my_campaign: {
    path: 'my_campaign',
    getHref: () => `/my_campaign`,
  },
  notification: {
    path: 'notification',
    getHref: () => `/notification`,
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
    forgot_password: {
      path: '/auth/forgot-password',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/forgot-password${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    verify_otp: {
      path: '/auth/verify-otp',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/verify-otp${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
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
      path: '/app/categories',
      getHref: () => '/app/categories',
    },
    recipient: {
      path: '/app/recipients',
      getHref: () => '/app/recipients',
    },
    financialReport: {
      path: '/app/financial-reports',
      getHref: () => '/app/financial-reports',
    },
    education: {
      path: '/app/educations',
      getHref: () => '/app/educations',
    }
  },
} as const;
