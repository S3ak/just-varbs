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
      <Input type={type} placeholder={placeholder} name={name} {...props} />
    </>
  );
}

export default InputField;
