"use client";

import React from "react";

const Title = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-bold text-primary mb-1">{title}</h2>
      <h5 className="text-lg text-muted-foreground">{subtitle}</h5>
    </div>
  );
};

export default Title;
