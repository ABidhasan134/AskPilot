"use client";

import React, { Suspense } from "react";
import AuthForm from "./authFrom";


export default function AuthFormWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm type="logIn" />
    </Suspense>
  );
}