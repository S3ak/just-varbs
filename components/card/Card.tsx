import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface IProps {
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
}

export function MyCard({
  children = "",
  ...props
}: React.ComponentProps<"div"> & IProps) {
  return (
    <Card className="w-[350px]" {...props}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
