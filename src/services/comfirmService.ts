import Measurement from "../models/Measurement";

export const confirmService = {
  confirmMeasure: async (measure_uuid: string, confirmed_value: number) => {
    const measurement = await Measurement.findOne({ where: { measure_uuid } });

    if (!measurement) {
      throw new Error("MEASURE_NOT_FOUND");
    }

    if (measurement.has_confirmed) {
      throw new Error("CONFIRMATION_DUPLICATE");
    }

    measurement.measure_value = confirmed_value;
    measurement.has_confirmed = true;
    await measurement.save();
  },
};
