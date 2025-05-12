"use client"
import React, { useState } from "react";
import FormField from "@components/01-molecules/FormField";
import { InputNumber } from 'antd';
import { Funnel } from "@phosphor-icons/react/dist/icons/Funnel";
import Label from "@components/00-atoms/Label";
import { primaryTextStyle } from "@/styles/classes";

interface PaginationAndFilterProps {
  filter: string;
  setFilter: (value: string) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  userId: string;
}

const PaginationAndFilter: React.FC<PaginationAndFilterProps> = ({
  filter,
  setFilter,
  pageSize,
  setPageSize,
}) => {

  return (
    <div className="justify-center flex flexnowrap space-x-20 items-center h-20">
    <FormField
        type=""
        placeholder="Filter book..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        icon={<Funnel size={18} weight="fill" className="text-gray-500" />}
      />
      <div className="flex flexnowrap space-x-2 items-center mt-3">
        <Label className={primaryTextStyle}>Books per page</Label>
        <InputNumber
          min={15}
          max={150}
          defaultValue={15}
          value={pageSize}
          step={5}
          controls={true}
          style={{ height: 35, width: 60 }}
          onChange={value => setPageSize(Number(value))}
        />
      </div>
    </div>
  );
};

export default PaginationAndFilter;