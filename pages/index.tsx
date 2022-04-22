import type { GetServerSideProps, NextPage } from 'next';
// import Head from 'next/head';
import ErrorMessage from 'components/UI/ErrorMessage';
import LinksList from 'components/Links/LinksList/LinksList';
import usePromotedLinks from '../hooks/api/usePromotedLinks';
import { Link } from 'types';
import { getLinks } from './api/links/[category]';

interface HomeProps {
  links?: Link[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const links = await getLinks();
  return { props: { links } };
};

const Home: NextPage = ({ links }: HomeProps) => {
  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } = usePromotedLinks(links);

  if (error) return <ErrorMessage error={error} />;
  
  return (
    <LinksList
      links={data?.pages.flat()}
      isLoading={isLoading || isFetchingNextPage}
      onInfiniteScroll={fetchNextPage}
    />
  );
};

export default Home;
