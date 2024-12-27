import { Input } from "../../../inputs/Input/Input";
import { Button } from "../../../buttons/Button/Button";
import { Textarea } from "../../../Textarea/Textarea";
import { t } from "i18next";
import Icon from "../../../Icon/Icon";
import { useAppDispatch } from "../../../../store/hook";
import { openConfirmation } from "../../../../store/slices/modalSlice/modalSlice";

//CheckBox
import { CheckboxCalendarItem } from "./CheckboxCalendarItem";

//Input Radio
import { InputRadio } from "../../../inputs/InputRadio/InputRadio";

//component
import AddVacancyInfo from "./AddVacancyInfo";
import { VacancyInputProps } from "./AddVacancy.props";
//hook
import useVacancy from "./useVacancy";

const AddVacancy = () => {
  const dispatch = useAppDispatch();
  const { vacancyInput, vacancyInputRadio, vacancyCheckboxCalendar } =
    AddVacancyInfo();
  const { register, resetField, handleSubmit, getValues, setValue, errors } =
    useVacancy();

  const saveVacancy = () => {
    handleSubmit((data) => {
      dispatch(
        openConfirmation({
          typeConfirmation: "saveChangesVacancies",
          dataConfirmation: data,
        })
      );
    })();
  };

  return (
    <div className="">
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form>
        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-3">
            <div className="flex w-[445px] flex-col justify-start gap-3">
              {/* TODO: Компаня, Позиція, Лінк на вакансію, Канал зв'яку, Локація*/}
              <div className="flex flex-col gap-3">
                {vacancyInput.map((input: VacancyInputProps) => (
                  <Input
                    register={register}
                    resetField={resetField}
                    key={input.id}
                    name={input.name}
                    placeholder={input.placeholder || ""}
                    label={input.label}
                    errors={errors}
                  />
                ))}
              </div>

              {/* TODO:Формат: Дистанційно - Офіс - Змішаний*/}
              <div className="flex justify-between">
                {vacancyInputRadio.map((inputRadio: VacancyInputProps) => (
                  <InputRadio
                    key={inputRadio.id}
                    name={inputRadio.name}
                    id={inputRadio.id}
                    className="addVacancy"
                    label={inputRadio.label}
                    register={register}
                    errors={errors}
                    value={inputRadio.value}
                  />
                ))}
              </div>

              {/* TODO:Формат: Нотатки*/}
              <div>
                <Textarea
                  register={register}
                  resetField={resetField}
                  key="note"
                  name="note"
                  placeholder={t("addVacancy.placeholders.notes")}
                  className=""
                  label={t("addVacancy.form.notes")}
                  errors={errors}
                />
              </div>
            </div>

            {/* TODO:Cтатус: Відправлене резюме, Тестове завдання ... Оффер*/}
            <div className="flex w-[445px] flex-col justify-between gap-4">
              <div className="relative flex flex-col gap-4 pt-2">
                <label>Статус</label>
                <div className="flex flex-col gap-4">
                  {vacancyCheckboxCalendar.map(
                    (checkboxCalendar: VacancyInputProps) => (
                      <CheckboxCalendarItem
                        key={checkboxCalendar.id}
                        name={checkboxCalendar.name}
                        id={checkboxCalendar.id}
                        label={checkboxCalendar.label}
                        register={register}
                        errors={errors}
                        getValues={getValues}
                        setValue={setValue}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              type="button"
              className="mx-auto mt-8"
              variant="ghost"
              size="small"
              // onClick={handleSubmitArchive}
            >
              {t("addVacancy.form.archive")}{" "}
              <Icon id={"send"} className="ml-3 h-6 w-6" />
            </Button>
            <Button
              // type="submit"
              type="button"
              className="mx-auto mt-8 bg-button"
              variant="ghost"
              size="big"
              onClick={saveVacancy}
            >
              {t("addVacancy.form.save")}
              <Icon id={"check-box"} className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddVacancy;
