import { Link, useNavigate } from "react-router-dom";
import { LabledInput } from "./LabledInput";
import { useState } from "react";
import { SignupInput } from "@samrat53/medium-backend-common";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const nagivate = useNavigate();
  const [postInputs, setpostInputs] = useState<SignupInput>({
    username: "",
    password: "",
    name: "",
  });

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      nagivate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen  flex justify-center flex-col">
        <div className="flex justify-center">
          <div>
            <div className="px-10 py-8">
              <div className="text-3xl font-extrabold">Create an Account</div>
              <div className="text-slate-500">
                {type === "signin"
                  ? "Donot have a account?"
                  : "Already have an account?"}
                <Link
                  className="pl-2 underline"
                  to={type === "signin" ? "/signup" : "/signin"}
                >
                  {type === "signin" ? "Sign Up" : "Sign In"}
                </Link>{" "}
              </div>
            </div>
            <div>
              {type === "signup" ? (
                <LabledInput
                  label="Name"
                  placeholder="Samrat"
                  onChange={(e) => {
                    setpostInputs((c) => ({
                      ...c,
                      name: e.target.value,
                    }));
                  }}
                />
              ) : null}

              <LabledInput
                label="Username/email"
                placeholder="samrat53"
                onChange={(e) => {
                  setpostInputs((c) => ({
                    ...c,
                    username: e.target.value,
                  }));
                }}
              />

              <LabledInput
                type="password"
                label="Password"
                placeholder="1234#yet"
                onChange={(e) => {
                  setpostInputs((c) => ({
                    ...c,
                    password: e.target.value,
                  }));
                }}
              />
              <Button label="Sign Up" onClick={sendRequest} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
