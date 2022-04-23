import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'utils/backend/wykopAxios';
import { Entry, WykopEntry, WykopResponse } from 'types';
import { mapEntry } from 'utils/backend/dataUtils';

export async function getEntries(category: string = 'hot', page: number = 1) {
  const { data } = await axios.get<WykopResponse<WykopEntry[]>>(
    `/entries/${category}/page/${page}/return/comments`
  );

  if (data.error) throw new Error(data.error.message_en);

  return data.data.map((l) => mapEntry(l));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = +req.query.page;
  const category = String(req.query.category);
  // if (!category) {
  //   res.status(400);
  //   return;
  // }
  try {
    const links = await getEntries(category, page);
    res.status(200).json(links);
  } catch (error) {
    res.status(404).json(error);
  }
}
