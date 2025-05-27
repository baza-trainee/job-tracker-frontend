import { z } from "zod";

import { emailRegex } from "./regSchema";
import { emailRuByRegex } from "./regSchema";
import { nameRegex } from "./regSchema";
import { textContactUsRegex } from "./regSchema";

export const ContactUsSchema = z.object({
  name: z
    .string()
    .min(2, `contactUs.nameValidation.min`)
    .regex(nameRegex, `notification.updatedUserName`)
    .max(30, `contactUs.nameValidation.max`)
    .trim()
    .or(z.literal("")),
  email: z
    .string()
    .min(4, `validation.emailMin`)
    .regex(emailRegex, `validation.emailInvalid`)
    .regex(emailRuByRegex, `validation.emailInvalidRuBy`)
    .max(254, `validation.emailMax`)
    .trim()
    .or(z.literal("")),
  requestText: z
    .string()
    .min(10, `contactUs.textValidation.min`)
    .regex(textContactUsRegex, `contactUs.textValidation.min`)
    .max(4000, `contactUs.textValidation.text`)
    .trim()
    .or(z.literal("")),
});
