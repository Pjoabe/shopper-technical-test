import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Measurement from "../models/Measurement";
import { consultGeminiAPI } from "../utils/geminiAPI";

function generateTemporaryImageUrl(base64Image: string): string {
  return `https://example.com/images/${uuidv4()}.jpg`;
}

export const uploadService = {
  processUpload: async (
    image: string,
    customer_code: string,
    measure_datetime: string,
    measure_type: "WATER" | "GAS"
  ) => {
    try {
      const measureDate = new Date(measure_datetime);
      const firstDayOfMonth = new Date(
        measureDate.getFullYear(),
        measureDate.getMonth(),
        1
      );
      const firstDayOfNextMonth = new Date(
        measureDate.getFullYear(),
        measureDate.getMonth() + 1,
        1
      );

      const existingMeasurement = await Measurement.findOne({
        where: {
          customer_code,
          measure_type,
          measure_datetime: {
            [Op.gte]: firstDayOfMonth,
            [Op.lt]: firstDayOfNextMonth,
          },
        },
      });

      if (existingMeasurement) {
        throw new Error("DOUBLE_REPORT");
      }

      const measure_value = await consultGeminiAPI(image);
      const image_url = generateTemporaryImageUrl(image);

      const measurement = await Measurement.create({
        customer_code,
        measure_datetime: measureDate,
        measure_type,
        measure_value,
        image_url,
        measure_uuid: uuidv4(),
      });

      return {
        image_url: measurement.image_url,
        measure_value: measurement.measure_value,
        measure_uuid: measurement.measure_uuid,
      };
    } catch (error) {
      console.error("Error in processUpload:", error);
      throw error;
    }
  },
};
