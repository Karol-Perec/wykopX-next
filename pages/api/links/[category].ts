import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'utils/backend/wykopAxios';
import { Link, WykopLink, WykopResponse } from 'types';
import { mapLink } from 'utils/backend/dataUtils';

export async function getLinks(category: string = 'promoted', page: number = 1) {
  const { data } = await axios.get<WykopResponse<WykopLink[]>>(`/links/${category}/page/${page}`);

  if (data.error) return [];
  
  return data.data.map((l) => mapLink(l));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Link[]>) {
  const page = +req.query.page;
  const category = String(req.query.category);
  // if (!category) {
  //   res.status(400);
  //   return;
  // }
  const links = await getLinks(category, page);

  res.status(200).json(links);
}
