import { Currencies } from "@/lib/data/currencies";
import { z } from "zod";

export const UpdateUserCurrencySchema = z.object({
  currency: z.custom((value) => {
    const found = Currencies.some((cur) => cur.value === value);
    if (!found) {
      throw new Error("Invalid currency");
    }

    return value;
  }),
});
