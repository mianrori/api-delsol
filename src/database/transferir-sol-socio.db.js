import oracledb from "oracledb";

export const transferirSolSocioDb = (db, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `BEGIN
            pro_transferir_sol_socio(:payload);
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
        message: "La tranferencia se realizó exitosamente.",
      });
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en transferirSolSocioDb: ${error.message}`);
      reject({
        success: false,
        message,
      });
    }
  });
};

export default { transferirSolSocioDb };
