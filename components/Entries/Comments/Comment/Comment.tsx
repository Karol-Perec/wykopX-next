import { Tooltip, Typography } from '@mui/material';
import { EntryComment } from 'types/entry.types';
import { calculateAprroximatedAge } from 'utils/dateUtils';
import { parseHtml } from 'utils/parseHtml';
import Avatar from 'components/UI/Avatar';
import * as S from './Comment.styles';

interface CommentProps {
  comment: EntryComment;
}

const Comment = ({ comment }: CommentProps) => {
  const { id, body, user, date, voteCountPlus } = comment;

  return (
    <div>
      {/* <RouterNoPropagationLink to={`/ludzie/${user.login}`}> */}
      <Avatar url={user.avatarUrl} size={32} />
      {/* </RouterNoPropagationLink>
      <RouterNoPropagationLink to={`/ludzie/${user.login}`}> */}
      <Typography>{user.login}</Typography>
      {/* </RouterNoPropagationLink> */}
      <Tooltip title={date}>
        <Typography variant='caption'>{calculateAprroximatedAge(date)}</Typography>
      </Tooltip>
      <Typography>{body && parseHtml(body)}</Typography>
    </div>
  );
};

export default Comment;
