import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/inputs/Input/Input";
import { Textarea } from "@/components/Textarea/Textarea";
import { Button } from "@/components/buttons/Button/Button";
import Icon from "@/components/Icon/Icon";

type NotesProps = {
  type: "addNotes" | "refreshNotes";
};

export const NotesSchema = z.object({
  notesName: z.string().min(1, "Має містити більше одного символа"),
  notesText: z.string().min(1, "Має містити більше одного символа"),
});

const NotesModal = ({ type }: NotesProps) => {
  const isAddNotes = type === "addNotes";

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof NotesSchema>>({
    defaultValues: {
      notesName: "",
      notesText: "",
    },
    resolver: zodResolver(NotesSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<z.infer<typeof NotesSchema>> = async (data) => {
    console.log("note Submit", data);
    try {
      //   setIsSearching(true);
      //   const trimmedQuery = data.query.trim();
      //   if (trimmedQuery && trimmedQuery !== queryFromRedux) {
      //     handleSearch(trimmedQuery);
      //   }
      //   setIsSearching(false);
    } catch (error) {
      //   console.error("Search error:", error);
      //   setIsSearching(false);
      //   setFocus("query", { shouldSelect: false });
    }
  };

  const handleButton = () => {
    console.log("1");
    handleSubmit(onSubmit)();
  };
  return (
    <div className="mb-4 mt-10 w-full text-left xl:my-12 xl:mb-4 xl:mt-10">
      <form>
        <div className="flex flex-col gap-3 md:gap-4">
          <Input
            register={register}
            resetField={resetField}
            key="notesName"
            name="notesName"
            placeholder={"Назва файлу"}
            type="text"
            className=""
            errors={errors}
          />
          <Textarea
            register={register}
            resetField={resetField}
            key="notesText"
            name="notesText"
            placeholder="Tекст"
            className=""
            errors={errors}
          />

          <div className="flex flex-col justify-center gap-2 md:flex-row xl:mt-4">
            <Button
              type="button"
              className="w-full bg-button md:mx-auto xl:mx-0 xl:w-auto"
              variant="ghost"
              size="big"
              onClick={() => handleButton()}
            >
              {"Створити"}
              <Icon id={"plus"} className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NotesModal;

// const dispatch = useAppDispatch();
// const addNotes = () => {
//   dispatch(
//     openModal({
//       typeModal: "addNotes",
//     })
//   );
// };
