import { Link } from 'types/link.types';
import useInfiniteScrolling from '../../../hooks/useInfiniteScrolling';
import Loading from '../../UI/Loading';
import LinkAbstract from '../LinkAbstract/LinkAbstract';

interface LinksListProps {
  links?: Link[];
  isLoading: boolean;
  onInfiniteScroll: () => void;
}

const LinksList = ({ links, isLoading, onInfiniteScroll }: LinksListProps) => {
  const lastLinkRef = useInfiniteScrolling(isLoading, onInfiniteScroll);
  const lastLink = null; // = links?.pop();

  return (
    <>
      {links?.map((link) => (
        <LinkAbstract link={link} key={link.id} />
      ))}
      {lastLink && <LinkAbstract link={lastLink} />}
      {isLoading && <Loading />}
    </>
  );
};

export default LinksList;
