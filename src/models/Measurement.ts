import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Measurement extends Model {
  public id!: number;
  public customer_code!: string;
  public measure_datetime!: Date;
  public measure_type!: "WATER" | "GAS";
  public measure_value!: number;
  public measure_uuid!: string;
  public image_url!: string;
  public has_confirmed!: boolean;
}

Measurement.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    measure_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    measure_type: {
      type: DataTypes.ENUM("WATER", "GAS"),
      allowNull: false,
    },
    measure_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    measure_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    has_confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Measurement",
    tableName: "Measurements",
  }
);

export default Measurement;
