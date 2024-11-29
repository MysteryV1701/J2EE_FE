import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import * as React from 'react';

import { ButtonProps } from '@/components/ui/button';
import { cn } from '@/helpers/cn';

import { Link } from '../link';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      'flex flex-row items-center gap-2 bg-secondary-200 p-2 rounded-md ',
      className,
    )}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'buttonStyled'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({
  className,
  isActive,
  children,
  href,
  ...props
}: PaginationLinkProps) => (
  <Link
    to={href as string}
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      isActive ? 'bg-secondary-600' : 'bg-secondary-300',
      'flex flex-row items-center px-3 py-2 hover:bg-secondary-600 transition duration-300 rounded-md',
      className,
    )}
    {...props}
  >
    {children}
  </Link>
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    buttonStyled={{ size: 'md' }}
    className={cn('gap-1 pl-2.5 ', className)}
    {...props}
  >
    <ChevronLeftIcon className="size-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    buttonStyled={{ size: 'md' }}
    className={cn('gap-1 pr-2.5 ', className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRightIcon className="size-4" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};

export type TablePaginationProps = {
  totalPages: number;
  currentPage: number;
  rootUrl: string;
  pageActive: number;
};

export const TablePagination = ({
  totalPages,
  currentPage,
  rootUrl,
  pageActive,
}: TablePaginationProps) => {
  const createHref = (page: number) => `${rootUrl}?page=${page}`;

  return (
    <Pagination className="justify-center py-8">
      <PaginationContent>
        {currentPage > 0 && (
          <PaginationItem>
            <PaginationPrevious href={createHref(currentPage - 1)} />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }, (_, index) => index).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={createHref(page)}
              isActive={page === pageActive}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationNext href={createHref(totalPages - 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
