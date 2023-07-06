import { NextFunction, Request, Response } from 'express';
import { createOrg } from '../../modules/organization/organization.service';
import { createUser } from '../../modules/user/user.service';
import { createOrgInput } from '../schemas/org.schema';
import { Fail, Success } from '../../utilities/response-parser';

export const registerOrganization = async (
  req: Request<{}, {}, createOrgInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    let { name, id, password, username, email } = req.body;

    const createdUser = await createUser({ email, name: username, password, id: v4().toString() });

    if (!id) id = v4();

    const newOrg = await createOrg({
      name,
      id,
      user_id: createdUser
    });

    await newOrg.save();

    return Success({ res, message: 'Organization registration done' })

  } catch (err: any) {
    if (err.code === '23505') {
      return Fail({ res, message: "Failed in registering Organization" });
    }
    next(err);
  }
};

function v4(): string {
  throw new Error('Function not implemented.');
}
