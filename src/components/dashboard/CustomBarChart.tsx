"use client";

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

  function updateParentWidth() {
    if (parentRef.current) {
      setParentWidth(parentRef.current.offsetWidth);
    }
  }

  useEffect(() => {
    updateParentWidth();
    window.addEventListener("resize", updateParentWidth);

    return () => {
      window.removeEventListener("resize", updateParentWidth);
    };
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
            className="absolute h-full w-0 block bg-violet-600/20 border border-violet-600 rounded-md transition-all duration-500 group-hover/bar:bg-violet-600/40 max-w-full"
            style={{
              width: ((lang.amount / max) * parentWidth) / 1.2,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export { CustomBarChart };
