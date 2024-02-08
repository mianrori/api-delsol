import oracledb from "oracledb";

export const procesarVentaSolObsequioDb = (db, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `BEGIN
          pro_procesa_venta_so(:payload);
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
        message: "La compra se realizó exitosamente.",
      });
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en procesarVentaSolObsequioDb: ${error.message}`);
      reject({
        success: false,
        message,
      });
    }
  });
};

export default { procesarVentaSolObsequioDb };
