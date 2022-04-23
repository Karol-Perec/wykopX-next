import type { GetServerSideProps, NextPage } from 'next';
// import Head from 'next/head';
import ErrorMessage from 'components/UI/ErrorMessage';
import { Entry } from 'types';
import { getEntries } from './api/entries';
import useEntries from '../hooks/api/useEntries';
import { MikroblogCategory } from '../types/mikroblog.types';
import { useRouter } from 'next/router';
import EntriesList from '../components/Entries/EntriesList/EntriesList';

interface MikroblogProps {
  entries?: Entry[];
}

export const getServerSideProps: GetServerSideProps<MikroblogProps> = async () => {
  const entries = await getEntries();
  return { props: { entries } };
};

const Home: NextPage = ({ entries }: MikroblogProps) => {
  const router = useRouter();
  const category = router.query.category as MikroblogCategory;

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } = useEntries(
    category,
    entries
  );

  if (error) return <ErrorMessage error={error} />;

  return (
    <EntriesList
      entries={data?.pages.flat()}
      isLoading={isLoading || isFetchingNextPage}
      onInfiniteScroll={fetchNextPage}
    />
  );
};

export default Home;
