import { Input } from "../../../inputs/Input/Input";
import { Button } from "../../../buttons/Button/Button";
import { Textarea } from "../../../Textarea/Textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ContactUsSchema } from "../../../../schemas/ContactUsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddVacancySchema } from "../../../../schemas/AddVacancySchema";
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

        },
        resolver: zodResolver(ContactUsSchema),
        mode: "onBlur",
    });

    const error = !!Object.keys(errors).length;

    return (
        <div
            className="">
            <form onSubmit={() => { }}>
                <div
                    className="flex flex-col items-center">

                    <div
                        className="flex flex-row gap-6">
                        <div
                            className="flex flex-col gap-6 justify-between w-[445px]">
                            <div
                                className="flex flex-col gap-3">
                                <Input
                                    register={register}
                                    resetField={resetField}
                                    key="company"
                                    name="company"
                                    placeholder={"Вкажіть назву компанії"}
                                    type="text"
                                    className=""
                                    label="Компанія"
                                    errors={error} />
                                <Input
                                    register={register}
                                    resetField={resetField}
                                    key="position"
                                    name="position"
                                    placeholder={"Вкажіть посаду"}
                                    type="text"
                                    className=""
                                    label="Позиція"
                                    errors={error} />
                                <Input
                                    register={register}
                                    resetField={resetField}
                                    key="link"
                                    name="link"
                                    placeholder={"Додайте посилання на вакансію"}
                                    type="text"
                                    className=""
                                    label="Лінк на вакансію"
                                    errors={error} />
                                <Input
                                    register={register}
                                    resetField={resetField}
                                    key="communication"
                                    name="communication"
                                    placeholder={"Вкажіть канал зв'язку з рекрутером"}
                                    type="text"
                                    className=""
                                    label="Канал зв'язку"
                                    errors={error} />
                                <Input
                                    register={register}
                                    resetField={resetField}
                                    key="location"
                                    name="location"
                                    placeholder={"Вкажіть місце розташування компанії"}
                                    type="text"
                                    className=""
                                    label="Локація"
                                    errors={error} />
                            </div>

                            <div
                                className="-mt-4 flex justify-between">
                                <Checkbox
                                    name="distance"
                                    id="distance"
                                    label="Дистанційно"
                                    register={register}
                                    type="signUp"
                                    errors={error}
                                />
                                <Checkbox
                                    name="office"
                                    id="office"
                                    label="Офіс"
                                    register={register}
                                    type="signUp"
                                    errors={error}
                                />
                                <Checkbox
                                    name="Mixed"
                                    id="Mixed"
                                    label="Змішаний"
                                    register={register}
                                    type="signUp"
                                    errors={error}
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
                                        label="Відправлено резюме"
                                        register={register}
                                        type="signUp"
                                        errors={error}
                                    />
                                    <Checkbox
                                        name="HR"
                                        id="HR"
                                        label="HR"
                                        register={register}
                                        type="signUp"
                                        errors={error}
                                    />
                                    <Checkbox
                                        name="testTask"
                                        id="testTask"
                                        label="Тестове завдання"
                                        register={register}
                                        type="signUp"
                                        errors={error}
                                    />
                                    <Checkbox
                                        name="technicalInterview"
                                        id="technicalInterview"
                                        label="Технічна співбесіда"
                                        register={register}
                                        type="signUp"
                                        errors={error}
                                    />
                                    <Checkbox
                                        name="rejection"
                                        id="rejection"
                                        label="Відмова"
                                        register={register}
                                        type="signUp"
                                        errors={error}
                                    />
                                    <Checkbox
                                        name="Offer"
                                        id="Offer"
                                        label="Офер"
                                        register={register}
                                        type="signUp"
                                        errors={error}
                                    />
                                </div>

                            </div>

                            <Textarea
                                register={register}
                                resetField={resetField}
                                key="Notes"
                                name="Notes"
                                placeholder="Місце для ваших нотаток"
                                className=""
                                label="Нотатки"
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
                            В архів <Icon id={"send"} className="w-6 ml-3" />
                        </Button>
                        <Button
                            type="button"
                            className="mx-auto mt-8 bg-button"
                            variant="ghost"
                            size="big">
                            Зберегти <Icon id={"check-box"} className="w-6 ml-3" />
                        </Button>
                    </div>

                </div>
            </form>

        </div>
    )
}

export default AddVacancy;