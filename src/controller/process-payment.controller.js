import { processPaymentService } from "../service/process-payment.service.js";

export const processPaymentController = async (req, res) => {
  await processPaymentService(req.db, req.body, res);
};

export default { processPaymentController };
