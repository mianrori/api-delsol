import { updateSocioInformationService } from "../service/update-socio-information.service.js";

export const updateSocioInformationController = async (req, res) => {
  await updateSocioInformationService(req.db, req.body, res);
};

export default { updateSocioInformationController };
