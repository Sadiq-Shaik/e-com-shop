import { useState, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Login() {
  const [isExistingUser, setIsExistingUser] = useState(true);

  const router = useRouter();

  const { data: session, status } = useSession();

  console.log(session, status);

  if (status === "authenticated") {
    router.push("/profile");
  }

  const emailRef = useRef();
  const passwordRef = useRef();

  const switchForm = (e) => {
    e.preventDefault();
    setIsExistingUser((prev) => !prev);
  };

  async function createUser(email, password) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";

    return data;
  }

  async function formSubmitHandler(e) {
    e.preventDefault();
    // console.log(usernameRef.current.value, passwordRef.current.value);
    if (isExistingUser) {
      //log in
      const result = await signIn("credentials", {
        // redirect: false,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        callbackUrl: "/profile",
      });

      console.log(1, result);

      emailRef.current.value = "";
      passwordRef.current.value = "";

      //   const res = await result.json();

      //   console.log(2, res);
      //   if(result.ok) {

      //   }
    } else {
      //sign up
      try {
        const res = await createUser(
          emailRef.current.value,
          passwordRef.current.value
        );
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="min-h-[75vh] w-[80%] md:w-1/2 mx-auto p-8 my-8 bg-slate-400 dark:bg-slate-600 rounded-lg">
      <form
        onSubmit={formSubmitHandler}
        className="flex flex-col border-2 border-slate-900 dark:border-slate-200 md:p-4 rounded-lg w-full lg:w-1/2 mx-auto"
      >
        <h2 className="text-xl text-center font-bold p-4">
          {isExistingUser ? "Login" : "Sign Up"}
        </h2>
        <div className="p-4 flex items-center gap-4">
          <label htmlFor="email">Email:</label>
          <input
            ref={emailRef}
            className="w-full px-2 py-1 rounded-lg dark:text-black"
            type="text"
            placeholder="enter email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="p-4 flex items-center gap-4">
          <label htmlFor="password">Password:</label>
          <input
            ref={passwordRef}
            className="w-full px-2 py-1 rounded-lg dark:text-black"
            type="password"
            placeholder="enter password"
            id="password"
            name="password"
            required
          />
        </div>
        <div className="p-4 flex items-center gap-4 w-full mx-auto">
          <input
            type="submit"
            value="Submit"
            className="rounded-lg p-2 bg-slate-500 w-full cursor-pointer hover:bg-slate-600 hover:dark:bg-slate-700 mx-auto"
          />
        </div>
      </form>
      <button
        className="block text-center mx-auto  w-1/2 my-2 hover:underline p-2"
        onClick={switchForm}
      >
        {isExistingUser
          ? "Dont have an account? Sign up"
          : "Already a user? Login"}
      </button>
    </div>
  );
}

export default Login;
