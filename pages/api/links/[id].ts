import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'utils/backend/wykopAxios';
import { WykopLink, WykopResponse } from 'types';
import { mapLink } from 'utils/backend/dataUtils';

export async function getLink(id: number) {
  const { data } = await axios.get<WykopResponse<WykopLink>>(`/links/link/${id}/withcomments/true`);

  if (data.error) throw new Error(data.error.message_en);

  return mapLink(data.data);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = +req.query.id;

  try {
    const entry = await getLink(id);
    res.status(200).json(entry);
  } catch (error) {
    res.status(404).json(error);
  }
}
