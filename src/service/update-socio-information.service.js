import { updateSocioInformationDb } from "../database/update-socio-information.db.js";

export const updateSocioInformationService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await updateSocioInformationDb(db, payload);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { updateSocioInformationService };
