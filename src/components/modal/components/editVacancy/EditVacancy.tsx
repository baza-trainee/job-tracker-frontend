import { Input } from "../../../inputs/Input/Input";
import { Button } from "../../../buttons/Button/Button";
import { Textarea } from "../../../Textarea/Textarea";
import { t } from "i18next";
import Icon from "../../../Icon/Icon";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import {
  openConfirmation,
  closeButton,
} from "../../../../store/slices/modalSlice/modalSlice";
// component
import { CheckboxWithCalendar } from "../addVacancyModals/CheckboxWithCalendar";
import { InputRadio } from "../../../inputs/InputRadio/InputRadio";
import AddVacancyStage from "../addVacancyModals/AddStage";
import AddVacancyInfo from "../addVacancyModals/AddVacancyInfo";
// props
import { VacancyInputProps } from "../addVacancyModals/AddVacancy.props";
import { TypesModal } from "../../ModalMain.types";
// hook
import useEditVacancy from "./useEditVacancy";
import { useEffect } from "react";

const EditVacancy = () => {
  const dispatch = useAppDispatch();
  const statusVacancy = useAppSelector(
    (state) => state.statusVacancy.newStatuses
  );
  const { vacancyFields, workTypeOptions } = AddVacancyInfo();

  const {
    register,
    resetField,
    handleSubmit,
    errors,
    getValues,
    setValue,
    vacancyData,
    isFormChanged,
  } = useEditVacancy();

  const isArchived = vacancyData?.isArchived || "";

  const handleConfirmation = (typeConfirmation: TypesModal) => {
    handleSubmit((data) => {
      dispatch(
        openConfirmation({
          typeConfirmation,
          dataConfirmation: data,
        })
      );
    })();
  };

  const deleteVacancy = () => handleConfirmation("deleteVacancy");
  const saveVacancy = () => handleConfirmation("saveEditVacancies");
  const handleSubmitArchive = () =>
    handleConfirmation(isArchived ? "restoreVacancy" : "arhiveVacancy");

  useEffect(() => {
    dispatch(
      closeButton({
        isButtonOpen: isFormChanged,
        resetForm: () => handleConfirmation("closeModalsaveEditVacancies"),
      })
    );
  }, [isFormChanged]);

  return (
    <div className="w-full pt-[50px] xl:pt-[44px]">
      <form>
        <div className="flex flex-col items-center gap-3">
          <div className="flex w-full flex-col gap-4 xl:flex-row xl:gap-6">
            <div className="flex flex-col justify-start gap-3">
              {/* TODO: Компаня, Позиція, Лінк на вакансію, Канал зв'яку, Локація*/}
              <div className="flex flex-col gap-3 xl:w-[393px] 2xl:w-[445px]">
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
              <div className="flex flex-col justify-between gap-3 md:flex-row">
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
            </div>

            {/* TODO:Cтатус: Відправлене резюме, Тестове завдання ... Оффер*/}
            <div className="relative flex flex-col gap-3 md:gap-4 2xl:pt-2">
              <label>{t("addVacancy.form.status")}</label>
              <div className="flex flex-col gap-3 md:gap-4 xl:w-[274px] 2xl:w-[342px]">
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

            {/* TODO:Формат: Нотатки*/}
            <div className="xl:w-[390px] 2xl:w-[418px]">
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

          <div className="flex w-full flex-col justify-center gap-3 xl:mt-6 xl:flex-row">
            <div className="flex flex-col gap-3 md:flex-row">
              <Button
                type="button"
                className="w-full md:mx-auto xl:mx-0 xl:w-auto"
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
                className="w-full md:mx-auto xl:-order-1 xl:mx-0 xl:w-auto"
                variant="ghost"
                size="small"
                onClick={deleteVacancy}
              >
                {t("addVacancy.form.delete")}
                <Icon id={"delete"} className="ml-3 h-6 w-6" />
              </Button>
            </div>
            <Button
              type="button"
              disabled={!isFormChanged}
              className="w-full md:mx-auto xl:mx-0 xl:w-auto"
              variant="accent"
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
