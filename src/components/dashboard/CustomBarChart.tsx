import React from "react";

interface Props {
  data: LanguageData[];
}

type LanguageData = {
  language: string;
  amount: number;
};

function CustomBarChart({ data }: Props) {
  return (
    <div>
      {data.map((lang) => (
        <pre>{lang.language}</pre>
      ))}
    </div>
  );
}

export { CustomBarChart };
