import mongoose, { Model } from "mongoose";
import CustomError from "./CustomError";

/**
 * Checks if a given ID exists in a MongoDB collection.
 */
export const idExist = async <T>(model: Model<T>, id: string): Promise<boolean> => {
  if (!isValidObjectId(id)) {
    throw new CustomError(`Invalid ${model.modelName} ID format`, 400);
  }

  const exists = await model.exists({ _id: id } as any);
  return !!exists;
};

export const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};
