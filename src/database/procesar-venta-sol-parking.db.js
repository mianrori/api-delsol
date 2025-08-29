import oracledb from "oracledb";

export const procesarVentaSolParkingDb = (db, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `BEGIN
          pro_procesa_venta_sp(:payload);
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
        message: "La compra se realizó exitosamente.",
      });
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en procesarVentaSolParkingDb: ${error.message}`);
      let status = 500;
      if (error.message.includes("20001") || error.message.includes("20002")) {
        status = 400;
      }
      reject({
        status,
        success: false,
        message,
      });
    }
  });
};

export default { procesarVentaSolParkingDb };
