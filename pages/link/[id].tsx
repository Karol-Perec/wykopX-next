import type { GetServerSideProps, NextPage } from 'next';
// import Head from 'next/head';
import ErrorMessage from 'components/UI/ErrorMessage';
import { Link } from 'types';
import { getLink } from '../api/links/[id]';
import useLink from 'hooks/api/useLink';
import Loading from '../../components/UI/Loading';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

interface LinkProps {
  link?: Link;
}

export const getServerSideProps: GetServerSideProps<LinkProps> = async (context) => {
  const id = context.params?.id;
  if (id) {
    const link = await getLink(+id);
    return { props: { link } };
  }
  return { props: {} };
};

const Link: NextPage = ({ link }: LinkProps) => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isLoading, error } = useLink(+id, link);

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return <Typography>{JSON.stringify(data)}</Typography>;
};

export default Link;
