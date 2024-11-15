import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import MyButton from "../components/MyButton";
import { setUser } from "../store/slicer/UserSlice";

type FormData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required("Please enter email"),
    password: yup.string().required("Please enter password"),
  })
  .required();

interface FormInputProps {
  control: Control<FormData>;
  name: keyof FormData;
  placeholder: string;
  secureTextEntry?: boolean;
  error?: { message?: string };
}

const FormInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  error,
}: FormInputProps) => (
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
          secureTextEntry={secureTextEntry}
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

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();

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
        "https://userauthbackend.onrender.com/api/v1/auth/login",
        data
      );
      console.log(response.data);
      dispatch(setUser(response.data));
      router.navigate("./");
    } catch (error) {
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
        <ActivityIndicator size="large" />
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
            Login
          </Text>
          {error && (
            <Text
              style={{ color: "red", textAlign: "center", marginBottom: 10 }}
            >
              {error}
            </Text>
          )}
          <View style={{ padding: 20, width: "80%", gap: 20 }}>
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
              secureTextEntry={true}
              error={errors.password}
            />
            <MyButton title="Login" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Login;
