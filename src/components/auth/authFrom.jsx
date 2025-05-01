"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import logo from "/public/logo.svg";
import FromField from "./fromFild";
import Link from "next/link";

function AuthForm({ type }) {
  const isLogIn = type === "logIn";

  const baseSchema = {
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  };

  const formSchema = z.object(
    isLogIn
      ? baseSchema
      : {
          fullName: z.string().min(2, "Full name is required").max(50),
          image: z
            .instanceof(File)
            .refine(
              (file) => file.size < 5 * 1024 * 1024,
              "Max file size is 5MB"
            ),

          ...baseSchema,
        }
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      image: "",
    },
  });

  function onSubmit(values) {
    // console.log(values);
    if (isLogIn) {
      console.log("this is log in information", values);
    } else {
      console.log("this is sing up information", values);
    }
  }

  return (
    <div className="card-border lg:w-[545px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex justify-center gap-4">
          <Image src={logo} alt="logo" />
          <h2 className="text-primary-100">Ask Pilot</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FromField form={form} isLogIn={isLogIn} />
            <Button type="submit" className="btn-primary">
              {isLogIn ? "Log In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center gap-1">
          {isLogIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            className="text-user-primary"
            href={isLogIn ? "/sign-up" : "/sign-in"}
          >
            {isLogIn ? "Sign Up" : "Log In"}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
