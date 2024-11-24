import { Spinner } from '@/components/ui/spinner';
import { useCampaigns } from '../api/get-campaigns';
import { FunctionComponent, useState } from 'react';
import { CampaignCard } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';

export const CampaignListGird: FunctionComponent = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

  const campaignQuery = useCampaigns({ queryConfig: {}, page });

  if (campaignQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const incrementPage = () => {
    setPage(page + 1);
    if (page + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const decrementPage = () => {
    setPage(page - 1);
    if ((page - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    if (page - 1 === 0) {
      return null;
    }
  };
  const totalPages = 10;
  const campaigns = campaignQuery?.data?.data;

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="h-64 w-full">
          <img
            src="/path/to/illustration.png"
            alt="No campaigns available"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 min-h-screen flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-md-16 gap-8 ">
        {campaigns.map((campaign) => {
          return <CampaignCard {...campaign} key={campaign.id}></CampaignCard>;
        })}
      </div>
      <Pagination
        totalPages={totalPages}
        pageSize={pageSize}
        page={page}
        changePage={changePage}
        incrementPage={incrementPage}
        decrementPage={decrementPage}
        minPageNumberLimit={minPageNumberLimit}
        maxPageNumberLimit={maxPageNumberLimit}
      />
    </div>
  );
};
