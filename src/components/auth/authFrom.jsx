"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import Image from "next/image";
import logo from '/public/logo.svg'
import FromField from "./fromFild";

export const formSchema = z.object({
  username: z.string().min(2).max(50),
})

function AuthForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });


  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="card-border lg:w-[545px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex justify-center gap-4">
          <Image src={logo} alt="logo" />
          <h2 className="text-primary-100">Ask Pilot</h2>
        </div>

        {/* Form start */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FromField form={form} />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        {/* Form end */}

      </div>
    </div>
  );
}

export default AuthForm;
