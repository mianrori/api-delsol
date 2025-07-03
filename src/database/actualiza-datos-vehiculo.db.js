import oracledb from "oracledb";

export const actualizaDatosVehiculoDb = (db, id, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `BEGIN
          pro_actualiza_datos_vehiculo(:id,:payload);
         END;`,
        {
          id,
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
        message: "Los datos del vehículo se han actualizado exitosamente.",
      });
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en actualizaDatosVehiculoDb: ${error.message}`);
      let status = 500;
      if (error.message.includes("20001")) {
        status = 404;
      } else if (error.message.includes("20009")) {
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

export default { actualizaDatosVehiculoDb };
