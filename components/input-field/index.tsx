import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputField({
  type = "text",
  placeholder = "yo",
  name = "",
  label = "",
  ...props
}) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} placeholder={placeholder} {...props} name={name} />
    </>
  );
}

export default InputField;
