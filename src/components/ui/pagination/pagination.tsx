/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { FunctionComponent } from 'react';

export interface PaginationNumberProps {
  totalPages: number;
  page: number;
  changePage: (page: number) => void;
  maxPageNumberLimit: number;
  minPageNumberLimit: number;
}
export interface PaginationProps {
  totalPages: number;
  pageSize: number;
  page: number;
  changePage: (page: number) => void;
  incrementPage: () => void;
  decrementPage: () => void;
  minPageNumberLimit: number;
  maxPageNumberLimit: number;
}

export const PaginatedNumbers: FunctionComponent<PaginationNumberProps> = ({
  totalPages,
  page,
  changePage,
  maxPageNumberLimit,
  minPageNumberLimit,
}) => {
  return Array.from({ length: totalPages }, (_, index) => {
    if (index < maxPageNumberLimit + 1 && index >= minPageNumberLimit)
      return (
        <button
          key={index}
          onClick={() => changePage(index)}
          className={`${
            page === index
              ? 'bg-primary-600 text-white'
              : 'bg-white hover:bg-gray-50'
          } border-gray-300 relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
        >
          {index + 1}{' '}
        </button>
      );
    else {
      return null;
    }
  });
};

export const Pagination: FunctionComponent<PaginationProps> = ({
  totalPages,
  page,
  changePage,
  incrementPage,
  decrementPage,
  minPageNumberLimit,
  maxPageNumberLimit,
}) => {
  return (
    <div className=" px-4 py-3 flex items-center justify-between sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="/"
          onClick={decrementPage}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="/"
          onClick={incrementPage}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between w-full">
        <nav
          className="relative z-0 inline-flex rounded-md -space-x-px justify-center flex-1"
          aria-label="Pagination"
        >
          <button
            disabled={page === 0}
            onClick={decrementPage}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <PaginatedNumbers
            totalPages={totalPages}
            changePage={changePage}
            page={page}
            minPageNumberLimit={minPageNumberLimit}
            maxPageNumberLimit={maxPageNumberLimit}
          />
          <button
            disabled={page === totalPages - 1}
            onClick={incrementPage}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
};
