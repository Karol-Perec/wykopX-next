import { useQuery } from 'react-query';
import axios from 'axios';
import { Entry } from 'types/entry.types';

const getEntry = async (id: number) => {
  const response = await axios.get<Entry>(`/api/entries/${id}`);
  return response.data;
};

const useEntry = (id: number, initialData?: Entry) =>
  useQuery(['entry', id], () => getEntry(id), {
    staleTime: 10000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    initialData,
  });

export default useEntry;
