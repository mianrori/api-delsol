import oracledb from "oracledb";

export const processPaymentDb = (db, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `BEGIN
            pro_procesa_pago_local(:payload,:id);
         END;`,
        {
          payload: {
            dir: oracledb.BIND_IN,
            val: JSON.stringify(payload),
            type: oracledb.STRING,
          },
          id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        },
      );
      resolve({
        status: 200,
        idPago: result.outBinds.id,
        success: true,
        message: "El pago se realizó exitosamente.",
      });
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1]; /*.trim();*/
      console.log(`Error en processPaymentDb: ${error.message}`);
      let status = 500;
      if (
        error.message.includes("20003") ||
        error.message.includes("20004") ||
        error.message.includes("20005") ||
        error.message.includes("20006") ||
        error.message.includes("20010")
      ) {
        status = 402;
      }
      reject({
        status,
        success: false,
        message,
      });
    }
  });
};

export default { processPaymentDb };
