import { acreditarSolObsequioService } from "../service/acreditar-sol-obsequio.service.js";

export const acreditarSolObsequioController = async (req, res) => {
  await acreditarSolObsequioService(req.db, req.body, res);
};

export default { acreditarSolObsequioController };
