import { getMatriculasService } from "../service/get-matriculas.service.js";

export const getMatriculasController = async (req, res) => {
  await getMatriculasService(req, res);
};

export default { getMatriculasController };
