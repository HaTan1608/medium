// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import sanityClient from "@sanity/client";

const config = {
  dataset: "production",
  projectId: "hpiphy3t",
  useCdn: true,
  token:
    "sk0YP4FVVD7OIqpDK2T6g1cD9r59DzRYa6c3qLW0WLWal8d4QyOJa37zKkLcNqbrzWFkg5niDS5jMDPMu2WnAdj8YMj6kAnpAGsfbsbxXwuAlIHExIIaDYx5h9u6roslTGBVu6XkW3XE0t1Fhv1OCJLvKfwUW17SWx4lWL4eQpxSYeXXJfbk",
};

const client = sanityClient(config);
export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body);
  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (err) {
    res.status(200).json({ message: err });
  }
  res.status(200).json({ name: "Ok" });
}
