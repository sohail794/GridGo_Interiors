interface FormLabelProps {
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
}

export default function FormLabel({ children, required = false, htmlFor }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium mb-2 text-white"
    >
      {children}
      {required && <span className="text-[rgb(0,255,136)] ml-1">*</span>}
    </label>
  );
}
