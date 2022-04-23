import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'utils/backend/wykopAxios';
import { WykopEntry, WykopResponse } from 'types';
import { mapEntry } from 'utils/backend/dataUtils';

export async function getEntry(id: number) {
  const { data } = await axios.get<WykopResponse<WykopEntry>>(`/entries/entry/${id}`);

  if (data.error) throw new Error(data.error.message_en);

  return mapEntry(data.data);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = +req.query.id;

  try {
    const entry = await getEntry(id);
    res.status(200).json(entry);
  } catch (error) {
    res.status(404).json(error);
  }
}
