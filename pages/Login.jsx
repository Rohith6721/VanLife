import React, { useState } from "react";
import {
  useLoaderData,
  useNavigate,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../apis";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  console.log("Action needed");
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host" ;
  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedin", true);
    console.log(data);
    return redirect(pathname);
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  //   const [loginFormData, setLoginFormData] = useState({
  //     email: "",
  //     password: "",
  //   });
  //   const [status, setStatus] = useState("idle");
  //   const [error, setError] = useState(null);
  const message = useLoaderData();
  //   const navigate = useNavigate();
  const errorMessage = useActionData();
  const navigation = useNavigation();

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     setStatus("submitting");
  //     // setError(null);
  //     loginUser(loginFormData)
  //       .then((data) => {
  //         navigate("/host", { replace: true });
  //       })
  //     //   .catch((err) => setError(err))
  //       .finally(() => setStatus("idle"));
  //   }

  //   function handleChange(e) {
  //     const { name, value } = e.target;
  //     setLoginFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red"> {message} </h3>}
      {errorMessage && <h3 className="red"> {errorMessage} </h3>}

      <Form method="post" action="" className="login-form" replace>
        <input
          name="email"
          //   onChange={handleChange}
          type="email"
          placeholder="Email address"
          //   value={loginFormData.email}
        />
        <input
          name="password"
          //   onChange={handleChange}
          type="password"
          placeholder="Password"
          //   value={loginFormData.password}
        />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging In ..." : "Log In"}
        </button>
      </Form>
    </div>
  );
}