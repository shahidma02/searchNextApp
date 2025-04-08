"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// type FormFields = {
//   email: string;
//   password: string;
// };

type FormFields = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    // defaultValues: {
    //   email: "amena@gmail.com",
    //   password: "12345678",
    // },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //   throw new Error();
      console.log(data);
    } catch (error) {
      //   setError("root", { message: "email already taken" });
    }
  };
  return (
    <form
      className="flex flex-col gap-4 w-full max-w-sm p-6 bg-white rounded-2xl shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("email", {
          //   required: "Email is required",
          //   pattern: {
          //     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          //     message: "Enter a valid email",
          //   },
        })}
        type="text"
        placeholder="Email"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      <input
        {...register("password", {
          //   required: "password is required",
          //   minLength: {
          //     value: 8,
          //     message: "Password lenght should be minimum 8 characters",
          //   },
        })}
        type="password"
        placeholder="Password"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.password && (
        <p className="text-red-600">{errors.password.message}</p>
      )}
      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors.root && <p className="text-red-600">{errors.root.message}</p>}
    </form>
  );
};

export default Form;
