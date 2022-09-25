import { ClientSession } from 'mongodb';
import { Model } from 'mongoose';

export const withDBTransaction = async (
  model: Model<any>,
  fun: (session: ClientSession) => Promise<any> | any,
) => {
  const session = await model.startSession();
  session.startTransaction();
  try {
    const res = await fun(session);
    await session.commitTransaction();
    return res;
  } catch (e) {
    console.log({ e });
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession().then();
  }
};
