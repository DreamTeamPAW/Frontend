"use client"
import FormField from "@components/01-molecules/FormField";
import { InputNumber } from 'antd';
import { Funnel } from "@phosphor-icons/react/dist/icons/Funnel";
import Label from "@components/00-atoms/Label";
import { primaryTextStyle } from "@/styles/classes";
import { useBooks } from "@/context/BookContext";
import { DEFAULT_LIMIT, INITIAL_PAGE } from "@/services/constants";

interface PaginationAndFilterProps {
}

const PaginationAndFilter: React.FC<PaginationAndFilterProps> = ({
}) => {

  const { currentParams } = useBooks();
  const { updateParams } = useBooks();

  return (
    <div className="justify-center flex flexnowrap space-x-20 items-center h-20">
      <FormField
        type=""
        placeholder="Filter book..."
        value={currentParams.query}
        icon={<Funnel size={18} weight="fill" className="text-gray-500" />}
        onChange={(value) => {
          updateParams({ ...currentParams, query: value.target.value });
        }}
      />
      <div className="flex flexnowrap space-x-2 items-center mt-3">
        <Label className={primaryTextStyle}>Books per page</Label>
        <InputNumber
          min={DEFAULT_LIMIT}
          max={150}
          defaultValue={DEFAULT_LIMIT}
          value={currentParams.limit}
          step={5}
          controls={true}
          style={{ height: 35, width: 60 }}
          onChange={value => {
            updateParams({ ...currentParams, limit: value || DEFAULT_LIMIT, page: INITIAL_PAGE })
          }}
        />
      </div>
    </div>
  );
};

export default PaginationAndFilter;
