import { DataSource } from "typeorm";
import config from "@app/ormconfig";

export default new DataSource(config);