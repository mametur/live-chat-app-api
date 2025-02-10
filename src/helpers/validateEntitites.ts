import mongoose, { Model } from "mongoose";

/**
 * Checks if a given ID exists in a MongoDB collection.
 */
export const checkEntityExists = async <T>(model: Model<T>, id: string): Promise<boolean> => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error(`Invalid ${model.modelName} ID format`);
  }

  const exists = await model.exists({ _id: id } as any);
  return !!exists;
};
