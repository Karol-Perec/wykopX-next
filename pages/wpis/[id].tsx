import type { GetServerSideProps, NextPage } from 'next';
// import Head from 'next/head';
import ErrorMessage from 'components/UI/ErrorMessage';
import { Entry } from 'types';
import { getEntry } from '../api/entries/[id]';
import useEntry from 'hooks/api/useEntry';
import { useRouter } from 'next/router';
import Loading from 'components/UI/Loading';
import EntryAbstract from 'components/Entries/EntryAbstract/EntryAbstract';

interface EntryProps {
  entry?: Entry;
}

export const getServerSideProps: GetServerSideProps<EntryProps> = async (context) => {
  const id = context.params?.id;
  if (id) {
    const entry = await getEntry(+id);
    return { props: { entry } };
  }
  return { props: {} };
};

const Entry: NextPage = ({ entry }: EntryProps) => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isLoading, error } = useEntry(+id, entry);

  if (error) return <ErrorMessage error={error} />;

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <ErrorMessage error='Nie znaleziono' />;

  return <EntryAbstract entry={data} />;
};

export default Entry;
