import Measurement from "../models/Measurement";

export const listService = {
  listMeasures: async (customer_code: string, measure_type?: string) => {
    const where: any = { customer_code };
    if (measure_type) {
      where.measure_type = measure_type.toUpperCase();
    }

    const measures = await Measurement.findAll({
      where,
      attributes: [
        "measure_uuid",
        "measure_datetime",
        "measure_type",
        "has_confirmed",
        "image_url",
      ],
    });

    return measures;
  },
};
