import { QueryFunction, useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'types/link.types';

const getPromotedLinks: QueryFunction<Link[]> = async ({ pageParam = 1 }) => {
  const response = await axios.get<Link[]>('/api/links', {
    params: { page: pageParam, category: 'promoted' },
  });
  return response.data;
};

const usePromotedLinks = (initialData?: Link[]) =>
  useInfiniteQuery(['promoted-links'], getPromotedLinks, {
    staleTime: 100000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    getNextPageParam: (_lastPage, pages) => pages.length + 1,
    ...(initialData && {
      initialData: {
        pages: [initialData],
        pageParams: [null],
      },
    }),
  });

export default usePromotedLinks;
