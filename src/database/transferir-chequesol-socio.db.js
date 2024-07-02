import oracledb from "oracledb";

export const transferirChequeSolSocioDb = (db, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `BEGIN
            pro_transferir_chequesol_socio(:payload);
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
        message: "La transferencia se realizó exitosamente.",
      });
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en transferirChequeSolSocioDb: ${error.message}`);
      reject({
        success: false,
        message,
      });
    }
  });
};

export default { transferirChequeSolSocioDb };
