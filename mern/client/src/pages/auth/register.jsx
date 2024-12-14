import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { Variable } from "lucide-react";
// import { title } from "process";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  UserName: "",
  email: "",
  password: ""
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        })
        navigate("/auth/login");
      }
      else {
        toast({
          title: data?.payload?.message,
          variant: 'destructive', 
        });
      }
      // console.log(data);

    });
  }

  console.log(formData)

  return (
    <div className=" mx-auto w-full max-w-md space-y-6">
      <div className=" text-center">xxxx
        <h1 className=" text-3xl font-bold tracking-tight text-foreground">
          {" "}
          Create new account
        </h1>
        <p> Already Have an Account
          <Link
            className=" font-medium text-primary ml-2 hover:underline"
            to="/auth/login"
          >
            Login
          </Link></p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={' Sign up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
