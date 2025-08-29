import { processPaymentDb } from "../database/process-payment.db.js";

export const processPaymentService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await processPaymentDb(db, payload);
      res.status(result.status).json(result);
    }
  } catch (error) {
    res.status(error.status).json(error);
  }
};

export default { processPaymentService };
