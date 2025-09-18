import { getChapasLocatariosService } from "../service/get-chapas-locatarios.service.js";

export const getChapasLocatariosController = async (req, res) => {
  await getChapasLocatariosService(req, res);
};

export default { getChapasLocatariosController };
