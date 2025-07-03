import oracledb from "oracledb";

export const actualizaVehiculoActivoDb = (db, id, activo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `BEGIN
          pro_actualiza_vehiculo_activo(:id,:activo);
         END;`,
        [id, activo ? "S" : "N"]
      );
      resolve({
        status: 200,
        success: true,
        message: "El campo activo del vehículo se ha actualizado exitosamente.",
      });
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en actualizaVehiculoActivoDb: ${error.message}`);
      let status = 500;
      if (error.message.includes("20001")) {
        status = 404;
      }
      reject({
        status,
        success: false,
        message,
      });
    }
  });
};

export default { actualizaVehiculoActivoDb };
