import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../inputs/Input/Input";
import Icon from "../../Icon/Icon";
import { IconButton } from "../../buttons/IconButton/IconButton";

const SearchSchema = z.object({
  query: z.string().min(1, "Search query cannot be empty"),
});

type SearchFormData = z.infer<typeof SearchSchema>;

export const SearchForm: FC = () => {
  const [savedQuery, setSavedQuery] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const {
    register,
    resetField,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<SearchFormData>({
    defaultValues: {
      query: "",
    },
    resolver: zodResolver(SearchSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<SearchFormData> = async (data) => {
    try {
      setIsSearching(true);
      console.log("Search query:", data.query);
      setSavedQuery(data.query);
      setIsSearching(false);
    } catch (error) {
      console.error("Search error:", error);
      setIsSearching(false);
      setFocus("query", { shouldSelect: false });
    }
  };

  const handleClear = () => {
    setSavedQuery(null);
    resetField("query");
  };

  return (
    <div>
      <form
        className="relative flex items-center font-nunito text-xl leading-[135%] text-textBlack"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          register={register}
          resetField={resetField}
          name="query"
          placeholder="Search..."
          type="text"
          className="flex-grow"
          errors={errors}
        />

        <button
          type="submit"
          className="absolute left-0"
          disabled={isSearching}
        >
          <Icon id={"search"} className="h-6 w-6" />
        </button>
      </form>

      {savedQuery && (
        <div className="mt-6 flex items-center font-nunito text-xl leading-[135%] text-textBlack">
          <p>
            результатів з пошуку
            <span className="pl-4 text-textOther">{savedQuery}</span>
          </p>
          <IconButton
            label="Close button"
            variant="default"
            onClick={handleClear}
          >
            <Icon id={"close-default"} className="h-6 w-6" />
          </IconButton>
        </div>
      )}
    </div>
  );
};
