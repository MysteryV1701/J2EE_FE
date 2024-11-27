import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Education } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getEducation = ({
  id,
}: {
  id: number;
}): Promise<{data: Education}> => {
  return api.get(`/educations/${id}`);
};

export const getEducationQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ['educations', id],
    queryFn: () => getEducation({ id }),
  });
};

type UseEducationOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getEducationQueryOptions>;
};

export const useEducation = ({ id, queryConfig }: UseEducationOptions) => {
  return useQuery({
    ...getEducationQueryOptions(id),
    ...queryConfig,
  });
};
