import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import * as yup from "yup";
import MyButton from "../components/MyButton";

type FormData = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const schema = yup.object({
  fname: yup.string().required("Please provide your first name."),
  lname: yup.string().required("Last name is required."),
  email: yup.string().email("Invalid email").required("Email is required."),
  password: yup.string().required("Please enter your password"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

interface FormInputProps {
  control: Control<FormData>;
  name: keyof FormData;
  placeholder: string;
  secureTextEntry?: boolean;
  error?: { message?: string };
}

const FormInput = ({ control, name, placeholder, error }: FormInputProps) => (
  <View>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          style={{
            borderWidth: 1,
            backgroundColor: "white",
            height: 50,
            paddingHorizontal: 20,
            borderRadius: 10,
            borderColor: error ? "red" : "gray",
          }}
        />
      )}
    />
    {error && (
      <Text style={{ color: "red", paddingHorizontal: 20 }}>
        {error.message}
      </Text>
    )}
  </View>
);

const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        "https://userauthbackend.onrender.com/api/v1/auth/signup",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      router.navigate("./login");
    } catch (error) {
      console.log("hi");
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Login failed. Please try again."
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator size={"large"} color={"blue"} />
      ) : (
        <View style={{ backgroundColor: "gainsboro", borderRadius: 16 }}>
          <Text
            style={{
              padding: 20,
              fontSize: 28,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Sign Up
          </Text>
          <View style={{ padding: 20, gap: 20, width: "80%" }}>
            <FormInput
              control={control}
              name="fname"
              placeholder="Enter your first name"
              error={errors.fname}
            />

            <FormInput
              control={control}
              name="lname"
              placeholder="Enter your last name"
              error={errors.lname}
            />

            <FormInput
              control={control}
              name="email"
              placeholder="Enter your email"
              error={errors.email}
            />

            <FormInput
              control={control}
              name="password"
              placeholder="Enter your password"
              secureTextEntry
              error={errors.password}
            />

            <FormInput
              control={control}
              name="password_confirmation"
              placeholder="Confirm your password"
              secureTextEntry
              error={errors.password_confirmation}
            />

            <MyButton title="Sign Up" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      )}
    </View>
  );
};

export default SignUp;
