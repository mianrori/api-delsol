import { processPaymentDb } from "../database/process-payment.db.js";

export const processPaymentService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await processPaymentDb(db, payload);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { processPaymentService };
