import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { Control, Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
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

const FormInput = ({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  error,
}: {
  control: Control<FormData>;
  name: keyof FormData;
  placeholder: string;
  secureTextEntry?: boolean;
  error?: { message?: string };
}) => (
  <>
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
            height: 50,
            paddingHorizontal: 20,
            borderRadius: 10,
            borderColor: error ? "red" : "gray",
          }}
          secureTextEntry={secureTextEntry}
        />
      )}
    />
    {error && <Text style={{ color: "red" }}>{error.message}</Text>}
  </>
);

const SignUp = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onsubmit = async(data: FormData) => {
    try {
      const response = await axios.post(
        "http://192.168.68.117:8000/api/register",
        data
      );
      console.log(response);
      router.navigate("/login");
    } catch (error) {
      
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

        <MyButton title="Sign Up" onPress={handleSubmit(onsubmit)} />
      </View>
    </View>
  );
};

export default SignUp;
