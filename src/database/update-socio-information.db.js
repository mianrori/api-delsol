import oracledb from "oracledb";

export const updateSocioInformationDb = (db, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `BEGIN
          pro_actualiza_dato_socio(:payload);
         END;`,
        {
          payload: {
            dir: oracledb.BIND_IN,
            val: JSON.stringify(payload),
            type: oracledb.STRING,
          },
        }
      );
      resolve({
        success: true,
        message: "Los datos del usuario se han actualizado exitosamente.",
      });
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en updateSocioInformationDb: ${error.message}`);
      reject({
        success: false,
        message,
      });
    }
  });
};

export default { updateSocioInformationDb };
