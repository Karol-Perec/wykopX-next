import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'types/link.types';

const getLink = async (id: number) => {
  const response = await axios.get<Link>(`/api/links/${id}`);
  return response.data;
};

const useLink = (id: number, initialData?: Link) =>
  useQuery(['link', id], () => getLink(id), {
    staleTime: 10000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    initialData,
  });

export default useLink;
