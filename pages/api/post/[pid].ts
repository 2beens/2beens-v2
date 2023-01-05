import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  todo: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { pid } = req.query;
  res.status(200).json({ todo: `Post: ${pid}` });
}
