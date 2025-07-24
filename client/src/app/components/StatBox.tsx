"use client";

import React from "react";

const StatBox = ({
  title,
  value,
  increase,
  icon,
  description,
}: {
  title: string;
  value: string;
  increase: string;
  icon: React.ReactNode;
  description: string;
}) => {
  return (
    <div className="col-span-2 row-span-1 flex flex-col justify-between rounded-xl bg-background p-5 shadow-sm border">
      <div className="flex justify-between items-center">
        <h3 className="text-muted-foreground text-lg font-medium">{title}</h3>
        {icon}
      </div>

      <h2 className="text-3xl font-semibold text-primary mt-2">{value}</h2>

      <div className="flex justify-between gap-2 mt-2">
        <p className="italic text-muted-foreground text-base">{increase}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default StatBox;
