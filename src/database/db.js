import "dotenv/config";
import config from "../../config.js";
import moment from "moment";
import oracledb from "oracledb";

export const connect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_19_10" });
      oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

      console.log(
        `[${moment(new Date()).format(
          "DD/MM/YYYY hh:mm:ss.SSSZ"
        )}]: Connecting to the ${config.dbSid} database.`
      );
      const connection = await oracledb.getConnection({
        user: config.dbUser,
        password: config.dbPassword,
        connectString: `${config.dbHost}:${config.dbPort}/${config.dbSid}`,
      });
      console.log(
        `[${moment(new Date()).format(
          "DD/MM/YYYY hh:mm:ss.SSSZ"
        )}]: Connected to the ${config.dbSid} database.`
      );
      resolve(connection);
    } catch (error) {
      reject(
        `[${moment(new Date()).format(
          "DD/MM/YYYY hh:mm:ss.SSSZ"
        )}]: Error connecting to ${config.dbSid}: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

export default {
  connect,
};
