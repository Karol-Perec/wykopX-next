import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { Entry } from 'types/entry.types';
import { MikroblogCategory } from '../../types/mikroblog.types';

// TO DO: add period
const getEntries = async (page: number, category: MikroblogCategory) => {
  const response = await axios.get<Entry[]>('/api/entries', {
    params: { page, category },
  });
  return response.data;
};

const useEntries = (category: MikroblogCategory, initialData?: Entry[]) =>
  useInfiniteQuery(['entries', category], ({ pageParam = 1 }) => getEntries(pageParam, category), {
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

export default useEntries;
