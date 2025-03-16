import { Button } from "@/components/ui/button";

export default function MyButton({
  children = null,
}: React.ComponentProps<"button">) {
  return <Button>{children}</Button>;
}
