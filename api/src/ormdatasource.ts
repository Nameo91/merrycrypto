import { DataSource } from "typeorm";
import config from "nestJS/src/ormconfig";

export default new DataSource(config);