import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hook.ts";
import { RootState } from "../../store/store.ts";
import { useGetAllVacancyQuery } from "../../store/querySlices/vacanciesQuerySlice.ts";
import ChartBarBase from "./ChartBarBase.tsx";

const ChartBarMonth: React.FC = () => {
    const { t } = useTranslation();
    const selectedMonth = useAppSelector((state: RootState) => state.calendar.selectedMonth);
    const { data: vacancies, isLoading, isError } = useGetAllVacancyQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching vacancies</div>;

    const notArhivedVacancies = vacancies?.filter((vacancy) => vacancy.isArchived === false);

    const statuses = notArhivedVacancies?.flatMap((vacancy) => vacancy.statuses) || [];

    const groupedByMonth = statuses.reduce<Record<string, { sent: number; responses: number }>>(
        (acc, status) => {
            const date = new Date(status.date);
            const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
            if (!acc[yearMonth]) acc[yearMonth] = { sent: 0, responses: 0 };

            if (status.name === "resume") acc[yearMonth].sent += 1;
            else if (["hr", "test", "tech", "offer", "reject"].includes(status.name))
                acc[yearMonth].responses += 1;

            return acc;
        },
        {}
    );

    // Генеруємо список місяців
    const monthNames: string[] = t("calendar.months", { returnObjects: true }) as string[];

    // Генеруємо діапазон
    const months = Array.from({ length: 12 }, (_, i) => {
        const date = new Date(selectedMonth.getFullYear(), i);
        return {
            label: monthNames[i],
            key: `${date.getFullYear()}-${String(i + 1).padStart(2, "0")}`,
        };
    });

    // Мітки для осі X
    const labels = months.map((m) => m.label);

    // Дані для діаграми
    const filteredData = months.map((m) => groupedByMonth[m.key] || { sent: 0, response: 0 });

    const datasets = [
        {
            label: t("chartBar.sent"),
            data: filteredData.map((d) => d.sent),
            backgroundColor: "rgba(208, 232, 197, 1)",
            borderColor: "rgba(208, 232, 197, 1)",
            borderWidth: 1,
        },
        {
            label: t("chartBar.responses"),
            data: filteredData.map((d) => d.responses),
            backgroundColor: "rgba(198, 231, 255, 1)",
            borderColor: "rgba(198, 231, 255, 1)",
            borderWidth: 1,
        },
    ];

    return <ChartBarBase labels={labels} datasets={datasets} />
};

export default ChartBarMonth;