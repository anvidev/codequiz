"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  data: LanguageData[];
}

type LanguageData = {
  language: string;
  amount: number;
};

function CustomBarChart({ data }: Props) {
  const [parentWidth, setParentWidth] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current) {
      setParentWidth(parentRef.current.offsetWidth);
    }
  }, []);

  const max = Math.max(...data.map((lang) => lang.amount));

  return (
    <div ref={parentRef} className="space-y-2">
      {data.map((lang, i) => (
        <div
          key={i}
          className="relative flex items-center py-2 group/bar cursor-pointer"
        >
          <div className="flex items-center justify-between z-10 w-full px-2 font-bold">
            <pre>{lang.language}</pre>
            <pre>{lang.amount}</pre>
          </div>
          <div
            className={cn(
              null,
              "absolute h-full block bg-violet-600 rounded-md transition-all group-hover/bar:opacity-70"
            )}
            style={{ width: ((lang.amount / max) * parentWidth) / 1.2 }}
          />
        </div>
      ))}
    </div>
  );
}

export { CustomBarChart };
