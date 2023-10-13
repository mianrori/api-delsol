import { addSocioService } from "../service/add-socio.service.js";

export const addSocioController = async (req, res) => {
  await addSocioService(req.db, req.body, res);
};

export default { addSocioController };
