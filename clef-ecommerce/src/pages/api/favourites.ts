import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import { getMedusaBackendUrl, getMedusaPublishableKey } from '../../lib/medusa-store';

type CustomerResponse = {
  customer?: {
    id?: string;
  };
};

let pool: Pool | null = null;

const getPool = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required for logged-in favourites.');
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 2,
    });
  }

  return pool;
};

const schema = () => process.env.FAVOURITES_DATABASE_SCHEMA || 'public';

const quoteIdent = (identifier: string) => `"${identifier.replace(/"/g, '""')}"`;

const tableName = () => `${quoteIdent(schema())}.user_favourites`;

const getBearerToken = (req: NextApiRequest) => {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return null;
  }

  return header.slice('Bearer '.length).trim();
};

const getCustomerId = async (token: string) => {
  const response = await fetch(`${getMedusaBackendUrl()}/store/customers/me`, {
    headers: {
      authorization: `Bearer ${token}`,
      'x-publishable-api-key': getMedusaPublishableKey(),
    },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as CustomerResponse;

  return payload.customer?.id ?? null;
};

const readFavourites = async (userId: string) => {
  const result = await getPool().query<{ product_id: string }>(
    `select product_id from ${tableName()} where user_id = $1 order by created_at desc`,
    [userId],
  );

  return result.rows.map((row) => row.product_id);
};

const replaceFavourites = async (userId: string, productIds: string[]) => {
  const uniqueIds = Array.from(new Set(productIds.filter(Boolean)));
  const client = await getPool().connect();

  try {
    await client.query('begin');
    await client.query(`delete from ${tableName()} where user_id = $1`, [userId]);

    for (const productId of uniqueIds) {
      await client.query(
        `insert into ${tableName()} (user_id, product_id) values ($1, $2) on conflict (user_id, product_id) do nothing`,
        [userId, productId],
      );
    }

    await client.query('commit');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    client.release();
  }

  return uniqueIds;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = getBearerToken(req);

  if (!token) {
    res.status(401).json({ message: 'Login is required for saved favourites.' });
    return;
  }

  const customerId = await getCustomerId(token);

  if (!customerId) {
    res.status(401).json({ message: 'Your session has expired. Please log in again.' });
    return;
  }

  try {
    if (req.method === 'GET') {
      res.status(200).json({ productIds: await readFavourites(customerId) });
      return;
    }

    if (req.method === 'PUT') {
      const productIds = Array.isArray(req.body?.productIds)
        ? req.body.productIds.filter(
            (value: unknown): value is string => typeof value === 'string',
          )
        : [];

      res
        .status(200)
        .json({ productIds: await replaceFavourites(customerId, productIds) });
      return;
    }

    res.setHeader('Allow', 'GET, PUT');
    res.status(405).json({ message: 'Method not allowed.' });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to update favourites.';
    const isConfigError = /DATABASE_URL|required|relation .*user_favourites/i.test(message);

    res.status(isConfigError ? 503 : 500).json({
      message: isConfigError
        ? 'Saved favourites are not configured on this server.'
        : 'Unable to update favourites right now.',
    });
  }
}
