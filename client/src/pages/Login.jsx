import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const onChangeHandler = (e, type) => {
    const name = e.target.name;
    const value = e.target.value;

    if (type == "signup") {
      setSignup({ ...signup, [name]: value });
    } else {
      setLogin({ ...login, [name]: value });
    }
  };

  const onSubmitHandler = async (e, type) => {
    e.preventDefault();
    const inputData = type === "signup" ? signup : login;
    const actions = type === "signup" ? registerUser : loginUser;
    await actions(inputData);

  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }
    if(loginIsSuccess && loginData)
    {
      toast.success(loginData.message || "Login successful");
      navigate('/');
    }
    if (registerError) {
      toast.error(registerError.message || "Register Failed");
      navigate('/login')
    }
    if (loginError) {
      toast.error(loginError.message || "Login Failed");
      navigate('/login')
    }
  }, [loginIsLoading,registerIsLoading,registerData,loginData,registerError,loginError]);

  return (
    <div className="flex justify-center items-center mt-40">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 border-gray-400 border-2 bg-gray-300 dark:bg-background">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card className="border-gray-400 border-2">
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new Account click Signup when your are done
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="name">FullName</Label>
                <Input
                  onChange={(e) => onChangeHandler(e, "signup")}
                  type="text"
                  value={signup.name}
                  id="name"
                  name="name"
                  placeholder="JohnDoe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => onChangeHandler(e, "signup")}
                  type="email"
                  value={signup.email}
                  name="email"
                  id="email"
                  placeholder="eg:JohnDoe@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => onChangeHandler(e, "signup")}
                  type="password"
                  value={signup.password}
                  name="password"
                  id="password"
                  placeholder="Strong password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={(e) => onSubmitHandler(e, "signup")}
                disabled = {registerIsLoading}
                className="w-full"
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                    Please wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card className="border-gray-400 border-2">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Access your account by entering your credentials below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => onChangeHandler(e, "login")}
                  value={login.email}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="your Email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => onChangeHandler(e, "login")}
                  value={login.password}
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Your password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={(e) => onSubmitHandler(e, "login")}
                disabled = {loginIsLoading}
                className="w-full"
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
