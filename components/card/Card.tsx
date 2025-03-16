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

export function MyCard({
  title = "default title",
  description = "default description",
  children = null,
  primaryCTA = "Click Me",
  secondaryCTA = "Click Me",
  ...props
}): React.ComponentProps<"div"> {
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
