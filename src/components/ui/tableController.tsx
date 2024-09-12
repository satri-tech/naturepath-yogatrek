"use client";
import { MoveRight } from "lucide-react";
import React from "react";

export default function TableController({
  currentTable,
  tablesPresent,
  itemsInLastTable,
  itemsPerTable,
  updateCurrentTable,
  updateCurrentTableByNumber,
}: {
  currentTable: number;
  tablesPresent: number;
  itemsInLastTable: number;
  itemsPerTable: number;
  updateCurrentTable: (mode: string) => void;
  updateCurrentTableByNumber: (index: number) => void;
}) {
  return (
    <div className="flex justify-between items-center text-sm text-gray-700 p-5 py-4">
      <div className="flex gap-2 items-center">
        <span>
          Showing{" "}
          {currentTable == tablesPresent - 1 ? itemsInLastTable : itemsPerTable}{" "}
          Entries
        </span>

        <span>
          <MoveRight size={16} />
        </span>
      </div>

      <div className="flex gap-1 items-center">
        {/*prev button*/}
        <span
          className="p-2 py-1 text-primary inline-block hover:bg-primary/20 rounded-md cursor-pointer"
          onClick={() => {
            updateCurrentTable("prev");
          }}
        >
          Prev
        </span>

        {/*page numbers container*/}
        <div className="flex gap-2 shrink-0">
          {Array(tablesPresent)
            .fill("")
            .slice(currentTable, currentTable + 2)
            .map((_, i) => {
              return (
                <span
                  key={i}
                  className={`${
                    i == 0
                      ? "bg-primary/90 text-white hover:bg-primary/80"
                      : "hover:text-primary hover:bg-slate-100"
                  } flex w-7 h-7 rounded-md items-center justify-center shrink-0 font-medium text-sm cursor-pointer`}
                  onClick={() => {
                    updateCurrentTableByNumber(currentTable + i);
                  }}
                >
                  {currentTable + i + 1}
                </span>
              );
            })}
        </div>

        {/*next button*/}
        <span
          className="p-2 py-1 text-primary inline-block hover:bg-primary/20 rounded-md cursor-pointer"
          onClick={() => {
            updateCurrentTable("next");
          }}
        >
          Next
        </span>
      </div>
    </div>
  );
}
