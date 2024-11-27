import { Spinner } from '@/components/ui/spinner';
import { useCampaigns } from '../api/get-campaigns';
import { FunctionComponent, useEffect, useState } from 'react';
import { CampaignCard } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import { cn } from '@/helpers/cn';
import Button from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { paths } from '@/config/paths';

interface CampaignListGirdProps {
  categoryId?: number;
  size?: number;
  pagination?: boolean;
}

export const CampaignListGird: FunctionComponent<CampaignListGirdProps> = (
  props,
) => {
  const [page, setPage] = useState(0);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

  const campaignQuery = useCampaigns({
    queryConfig: {},
    categoryId: props.categoryId ?? 0,
    page,
    size: props.size,
  });

  useEffect(() => {
    setPageNumberLimit(campaignQuery.data?.totalPages || 5);
    setMaxPageNumberLimit(campaignQuery.data?.totalPages || 5);
  }, [campaignQuery.data]);

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
  const campaigns = campaignQuery?.data?.data;

  if (!campaigns || campaigns.length === 0) {
    return (
      <div
        className={cn(
          props.pagination
            ? 'flex w-full items-center justify-center'
            : 'py-12',
        )}
      >
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
    <div
      className={cn(
        props.pagination
          ? 'mt-8 flex flex-col gap-4'
          : 'py-12 flex flex-col gap-8',
      )}
    >
      <div className="grid sm:grid-cols-2 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-md-16 gap-8 ">
        {campaigns.map((campaign) => {
          return <CampaignCard {...campaign} key={campaign.id}></CampaignCard>;
        })}
      </div>
      {props.pagination ? (
        <Pagination
          totalPages={campaignQuery.data?.totalPages || 5}
          pageSize={campaignQuery.data?.size || 5}
          page={page}
          changePage={changePage}
          incrementPage={incrementPage}
          decrementPage={decrementPage}
          minPageNumberLimit={minPageNumberLimit}
          maxPageNumberLimit={maxPageNumberLimit}
        />
      ) : (
        <div className="mx-auto">
          <Button
            buttonVariant="filled"
            buttonStyled={{ color: 'secondary', rounded: 'lg', size: 'lg' }}
            className="width-fit-content"
          >
            <Link
              to={
                paths.campaigns.path.startsWith('/')
                  ? paths.campaigns.path
                  : `/${paths.campaigns.path}`
              }
            >
              Xem thêm chiến dịch
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
