import { Input } from "../../../inputs/Input/Input";
import { Button } from "../../../buttons/Button/Button";
import { Textarea } from "../../../Textarea/Textarea";
import { t } from "i18next";
import Icon from "../../../Icon/Icon";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { openConfirmation } from "../../../../store/slices/modalSlice/modalSlice";
// component
import { CheckboxWithCalendar } from "../addVacancyModals/CheckboxWithCalendar";
import { InputRadio } from "../../../inputs/InputRadio/InputRadio";
import AddVacancyStage from "../addVacancyModals/AddStage";
import AddVacancyInfo from "../addVacancyModals/AddVacancyInfo";
// props
import { VacancyInputProps } from "../addVacancyModals/AddVacancy.props";
// hook
import useEditVacancy from "./useEditVacancy";

const EditVacancy = () => {
  const dispatch = useAppDispatch();

  const { vacancyFields, workTypeOptions } = AddVacancyInfo();
  const statusVacancy = useAppSelector(
    (state) => state.statusVacancy.newStatuses
  );
  const {
    register,
    resetField,
    handleSubmit,
    errors,
    getValues,
    setValue,
    vacancyData,
  } = useEditVacancy();

  const deleteVacancy = () => {
    dispatch(
      openConfirmation({
        typeConfirmation: "deleteVacancy",
      })
    );
  };
  const isArchived = vacancyData?.isArchived || "";

  const saveVacancy = () => {
    handleSubmit((data) => {
      console.log("Редагування вакансії", data);
      dispatch(
        openConfirmation({
          typeConfirmation: "saveEditVacancies",
          dataConfirmation: data,
        })
      );
    })();
  };

  const handleSubmitArchive = () => {
    setValue("isArchived", true);
    saveVacancy();
  };

  return (
    <div className="">
      <form>
        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-3">
            <div className="flex w-[445px] flex-col justify-start gap-3">
              {/* TODO: Компаня, Позиція, Лінк на вакансію, Канал зв'яку, Локація*/}
              <div className="flex flex-col gap-3">
                {vacancyFields.map((input: VacancyInputProps) => (
                  <Input
                    register={register}
                    resetField={resetField}
                    key={input.id}
                    name={input.name}
                    placeholder={input.placeholder || ""}
                    label={input.label}
                    errors={errors}
                    isRequired={true}
                    setValue={setValue}
                  />
                ))}
              </div>

              {/* TODO:Формат: Дистанційно - Офіс - Змішаний*/}
              <div className="flex justify-between">
                {workTypeOptions.map((inputRadio: VacancyInputProps) => (
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
                  {statusVacancy.map((checkboxCalendar: VacancyInputProps) => (
                    <CheckboxWithCalendar
                      key={checkboxCalendar.id}
                      name={checkboxCalendar.name}
                      id={checkboxCalendar.id}
                      label={`addVacancy.form.${checkboxCalendar.name}`}
                      register={register}
                      errors={errors}
                      date={checkboxCalendar.date}
                      getValues={getValues}
                      setValue={setValue}
                    />
                  ))}
                </div>
                <AddVacancyStage
                  register={register}
                  getValues={getValues}
                  setValue={setValue}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              type="button"
              className="mx-auto mt-8"
              variant="ghost"
              size="small"
              onClick={deleteVacancy}
            >
              {t("addVacancy.form.delete")}
              <Icon id={"delete"} className="ml-3 h-6 w-6" />
            </Button>
            <Button
              type="button"
              className="mx-auto mt-8"
              variant="ghost"
              size="small"
              onClick={handleSubmitArchive}
            >
              {t(`addVacancy.form.${isArchived ? "restore" : "archive"}`)}
              <Icon
                id={isArchived ? "restore" : "send"}
                className="ml-3 h-6 w-6"
              />
            </Button>
            <Button
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

export default EditVacancy;
