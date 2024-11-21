// import { Spinner } from '@/components/ui/spinner';
// import { useCampaigns } from '../api/get-campaigns';
import { CampaignList } from '@/helpers/dataset';
import { FunctionComponent, useState } from 'react';
import CampaginCard from '@/components/ui/card/campagin-card';
import { Pagination } from '@/components/ui/pagination';

export const CampaignListGird: FunctionComponent = () => {
  // const campaignQuery = useCampaigns();

  // if (campaignQuery.isLoading) {
  //   return (
  //     <div className="flex h-48 w-full items-center justify-center">
  //       <Spinner size="lg" />
  //     </div>
  //   );
  // }
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // For the pagination
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

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
  const totalPages = 20;
  const campaigns = CampaignList;

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
        {campaigns.map((campagin) => {
          return <CampaginCard {...campagin} key={campagin.id}></CampaginCard>;
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
