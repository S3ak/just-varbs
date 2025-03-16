import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IProps {
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
}

export function MyCard({
  title = "",
  description = "",
  children = "",
  primaryCTA = "",
  secondaryCTA = "",
  ...props
}: React.ComponentProps<"div"> & IProps) {
  return (
    <Card className="w-[350px]" {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">{secondaryCTA}</Button>
        <Button>{primaryCTA}</Button>
      </CardFooter>
    </Card>
  );
}
