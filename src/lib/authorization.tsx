import * as React from 'react';

import { Comment, User } from '@/types/api';

import { useUser } from './auth';
import { ROLES } from '../types/enum';

export type RoleTypes = ROLES;

export const POLICIES = {
  'comment:delete': (user: User, comment: Comment) => {
    if (user.role_name === ROLES.ADMIN) {
      return true;
    }

    if (user.role_name === ROLES.USER && comment.author?.id === user.id) {
      return true;
    }

    return false;
  },
};

export const useAuthorization = () => {
  const user = useUser();

  if (!user.data) {
    throw Error('User does not exist!');
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0 && user.data) {
        return allowedRoles?.includes(user.data.role_name as RoleTypes);
      }

      return true;
    },
    [user.data],
  );

  return { checkAccess, role: user.data.roleName };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
