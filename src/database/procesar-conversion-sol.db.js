import oracledb from "oracledb";

export const procesarConversionSolDb = (db, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `BEGIN
            pro_conversion_soles(:payload);
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
        status: 200,
        success: true,
        message: "La conversión se realizó exitosamente.",
      });
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en processPaymentDb: ${error.message}`);
      let status = 500;
      if (
        error.message.includes("20001") ||
        error.message.includes("20002") ||
        error.message.includes("20003") ||
        error.message.includes("20004") ||
        error.message.includes("20005") ||
        error.message.includes("20006")
      ) {
        status = 409;
      }
      reject({
        status,
        success: false,
        message,
      });
    }
  });
};

export default { procesarConversionSolDb };
