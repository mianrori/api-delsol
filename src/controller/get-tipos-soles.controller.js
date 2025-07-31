import { getTiposSolesService } from "../service/get-tipos-soles.service.js";

export const getTiposSolesController = async (req, res) => {
  await getTiposSolesService(req.db, res);
};

export default { getTiposSolesController };
