import { type NextApiRequest, type NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { prisma } from "../../../server/db/client";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await prisma.admin.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (!user) res.status(200).json("");

  if (user)
    bcrypt.compare(req.body.password, user.password, function () {
      res.status(200).json(user);
    });
};

export default examples;
