import oracledb from "oracledb";

export const acreditarSolObsequioDb = (db, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `BEGIN
          pro_genera_so(:payload);
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
        message: "Los soles se han acreditado con éxito.",
      });
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en acreditarSolObsequioDb: ${error.message}`);
      reject({
        success: false,
        message,
      });
    }
  });
};

export default { acreditarSolObsequioDb };
