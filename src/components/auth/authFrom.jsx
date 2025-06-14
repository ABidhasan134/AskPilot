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
import { toast } from "sonner";
import UseAxiosPublic from "@/hooks/useAxiosPublic";
import axios from "axios";
import { useRouter} from 'next/navigation';
import { signIn } from "next-auth/react";

const imageHostkey = process.env.NEXT_PUBLIC_IMAGE_HOSTING_API_KEY;
const hostURl = `https://api.imgbb.com/1/upload?key=${imageHostkey}`;
// console.log(imageHostkey);
const AuthForm = ({ type }) => {
  const axiosPublic = UseAxiosPublic();
  const router = useRouter();
  // const searchParams= useSearchParams();
  // const path=searchParams.get('redirect')
  // console.log(db);
  const isLogIn = type === "logIn";
  // console.log(isLogIn)

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

  async function onSubmit(values) {
    // console.log(values);
    const email = { email: values.email };
    if (isLogIn === false) {
      try {
        const formData = new FormData();
        formData.append("image", values.image);

        const res = await axios.post(hostURl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const imageUrl = res.data?.data?.display_url;
        if (imageUrl) {
          const userData = {
            fullName: values.fullName,
            email: values.email,
            password: values.password,
            image: imageUrl,
          };
          const res = await axiosPublic.post(`/api/signUp`, userData);
          if (res.data.result.insertedId) {
            const resJWT = await axiosPublic.post(`/api/jwt`, email);
            // cookies.set("jwt", resJWT.data.token);
            toast.success("Account created successfully!");
            // console.log("jwt respons", resJWT);
            setTimeout(() => {
              router.push("/");
            }, 2000);
            return;
          } else {
            toast.error("Account failed to create. Please try again.");
          }
          // console.log("Database respons",res.data)
          return;
        } else {
          toast.error("Have a problem to uploade Image. Please try agin");
        }

        // console.log("Sign up data:", userData);
      } catch (error) {
        toast.error("Image upload or sign up failed.");
        // console.error(error);
      }
    } else {
      try {
        // console.log(values)
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        console.log("this responses form the auth from", res);
        if (res?.ok) {
          toast.success("Log In successful");
            setTimeout(() => {
              // router.push(path || "/");
              router.push("/");
            }, 2000);
        } else {
          toast.error("Log In failed. Please try again");
        }
      } catch (error) {
        toast.error("Login failed.");
        // console.log("Error to log in",error)
      }
      // console.log("logIn values", values);
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
};

export default AuthForm;
