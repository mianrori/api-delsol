import oracledb from "oracledb";

export const transferirSolLocalDb = (db, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `BEGIN
            pro_transferir_sol_local(:payload);
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
      console.log(`Error en transferirSolLocalDb: ${error.message}`);
      reject({
        success: false,
        message,
      });
    }
  });
};

export default { transferirSolLocalDb };
