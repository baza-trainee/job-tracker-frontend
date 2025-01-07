import Icon from "../Icon/Icon.tsx";

export const Soon = () => {
    return (
        <div className="w-[348px] flex flex-col p-4 text-textBlack">
            <h3 className="w-full font-nunito px-6  text-textBlack text-2xl font-bold mb-[10px]">Незабаром</h3>
            <ul className="w-full">
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <button className="w-full py-3 px-6 bg-backgroundTertiary flex items-center justify-start gap-4 rounded-xl hover:bg-backgroundSecondary" >
                <Icon id="plus" className="size-6 ml-4 mr-[13px]" />
                Додати подію
            </button>
        </div>
    );
};

export default Soon;
