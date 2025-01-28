import { useState } from "react";

export default function useForm<T>(
  initialValues: T,
  validate: (values: T) => { [key: string]: string }
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (name: keyof T) => (text: string) => {
    setValues({ ...values, [name]: text });
  };

  const handleSubmit = (callback: () => void) => {
    const errors = validate ? validate(values) : {};
    console.log({ errors });
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      callback();
    }
  };

  const setError = (key: keyof T | "all", error: string) => {
    if (key === "all") {
      const newErrors: { [key: string]: string } = {};
      for (const key in values) {
        newErrors[key] = error;
      }
      setErrors(newErrors);
    } else {
      setErrors({ [key]: error });
    }
  };

  return { values, errors, handleChange, handleSubmit, setError };
}
