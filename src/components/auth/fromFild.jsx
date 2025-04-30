import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FromField = ({ form, isLogIn }) => {
  return (
    <>
      {/* Full name field (only for Sign Up) */}
      {!isLogIn && (
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormDescription>This will appear on your profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Email field */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter your email" {...field} />
            </FormControl>
            <FormDescription>We'll never share your email.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Password field */}
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Enter your password" {...field} />
            </FormControl>
            <FormDescription>Make sure it's strong and secure.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* File input (optional, only for Sign Up) */}
      {!isLogIn && (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Profile Picture</Label>
          <Input id="picture" type="file" />
        </div>
      )}
    </>
  );
};

export default FromField;
