import { Input } from "../../../inputs/Input/Input";
import { Button } from "../../../buttons/Button/Button";
import { Textarea } from "../../../Textarea/Textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddVacancySchema } from "../../../../schemas/AddVacancySchema";
import { t } from "i18next";
import Checkbox from "../../../checkbox/Checkbox";
import Icon from "../../../Icon/Icon";

const AddVacancy = () => {

    const {
        register,
        resetField,
        formState: { errors },
    } = useForm<z.infer<typeof AddVacancySchema>>({
        defaultValues: {
            company: "",
            position: "",
            link: "",
            communication: "",
            location: "",
            notes: "",

        },
        resolver: zodResolver(AddVacancySchema),
        mode: "onBlur",
    });

    return (
        <div
            className="">
            <form onSubmit={() => {}}>
                <div
                    className="flex flex-col items-center">

                    <div
                        className="flex flex-row gap-6">
                        <div
                            className="flex flex-col gap-6 justify-between w-[445px]">
                            <div
                                className="flex flex-col gap-5">
                                <Input
                                    register={register}
                                    resetField={resetField}
                                    key="company"
                                    name="company"
                                    placeholder={t("addVacancy.placeholders.company")}
                                    type="text"
                                    className=""
                                    label={t("addVacancy.form.company")}
                                    errors={errors} />
                                <Input
                                    register={register}
                                    resetField={resetField}
                                    key="position"
                                    name="position"
                                    placeholder={t("addVacancy.placeholders.position")}
                                    type="text"
                                    className=""
                                    label={t("addVacancy.form.position")}
                                    errors={errors} />
                                <Input
                                    register={register}
                                    resetField={resetField}
                                    key="link"
                                    name="link"
                                    placeholder={t("addVacancy.placeholders.link")}
                                    type="text"
                                    className=""
                                    label={t("addVacancy.form.link")}
                                    errors={errors} />
                                <Input
                                    register={register}
                                    resetField={resetField}
                                    key="communication"
                                    name="communication"
                                    placeholder={t("addVacancy.placeholders.communication")}
                                    type="text"
                                    className=""
                                    label={t("addVacancy.form.communication")}
                                    errors={errors} />
                                <Input
                                    register={register}
                                    resetField={resetField}
                                    key="location"
                                    name="location"
                                    placeholder={t("addVacancy.placeholders.location")}
                                    type="text"
                                    className=""
                                    label={t("addVacancy.form.location")}
                                    errors={errors} />
                            </div>

                            <div
                                className="flex justify-between mt-2">
                                <Checkbox
                                    name="distance"
                                    id="distance"
                                    label={t("addVacancy.form.distance")}
                                    register={register}
                                    type="signUp"
                                    errors={errors}
                                />
                                <Checkbox
                                    name="office"
                                    id="office"
                                    label={t("addVacancy.form.office")}
                                    register={register}
                                    type="signUp"
                                    errors={errors}
                                />
                                <Checkbox
                                    name="mixed"
                                    id="mixed"
                                    label={t("addVacancy.form.mixed")}
                                    register={register}
                                    type="signUp"
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <div
                            className="flex flex-col gap-4 justify-between w-[445px]">
                            <div
                                className="flex flex-col gap-4 pt-2">
                                <label>
                                    Статус
                                </label>

                                <div
                                    className="flex flex-col gap-4">
                                    <Checkbox
                                        name="sendSummary"
                                        id="sendSummary"
                                        label={t("addVacancy.form.sendSummary")}
                                        register={register}
                                        type="signUp"
                                        errors={errors}
                                    />
                                    <Checkbox
                                        name="HR"
                                        id="HR"
                                        label={t("addVacancy.form.HR")}
                                        register={register}
                                        type="signUp"
                                        errors={errors}
                                    />
                                    <Checkbox
                                        name="testTask"
                                        id="testTask"
                                        label={t("addVacancy.form.testTask")}
                                        register={register}
                                        type="signUp"
                                        errors={errors}
                                    />
                                    <Checkbox
                                        name="technicalInterview"
                                        id="technicalInterview"
                                        label={t("addVacancy.form.technicalInterview")}
                                        register={register}
                                        type="signUp"
                                        errors={errors}
                                    />
                                    <Checkbox
                                        name="rejection"
                                        id="rejection"
                                        label={t("addVacancy.form.rejection")}
                                        register={register}
                                        type="signUp"
                                        errors={errors}
                                    />
                                    <Checkbox
                                        name="offer"
                                        id="offer"
                                        label={t("addVacancy.form.offer")}
                                        register={register}
                                        type="signUp"
                                        errors={errors}
                                    />
                                </div>

                            </div>

                            <Textarea
                                register={register}
                                resetField={resetField}
                                key="notes"
                                name="notes"
                                placeholder={t("addVacancy.placeholders.notes")}
                                className=""
                                label={t("addVacancy.form.notes")}
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div
                        className="flex gap-3 max-w-[443px]">
                        <Button
                            type="button"
                            className="mx-auto mt-8"
                            variant="ghost"
                            size="small"
                        >
                            {t("addVacancy.form.archive")} <Icon id={"send"} className="w-6 ml-3" />
                        </Button>
                        <Button
                            type="button"
                            className="mx-auto mt-8 bg-button"
                            variant="ghost"
                            size="big">
                            {t("addVacancy.form.save")} <Icon id={"check-box"} className="w-6 ml-3" />
                        </Button>
                    </div>

                </div>
            </form>

        </div>
    )
}

export default AddVacancy;