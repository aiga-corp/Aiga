'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "../utils/supabase/supabase-client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";




export default function SignupForm() {

  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);


  const { toast } = useToast();


  const formSchema = z.object({

    fullName: z.string().min(2, "The minimum name length is 2 characters."),

    displayName: z.string().min(1, "The minimum display name length is 1 character"),

    email: z.string().email({
      "message": "The Email provided is invalid!"
    }).max(300, {"message": "the maximum email length is 300 characters"}),

    password: z.string().min(6, {"message": "The minimum password length is 6 characters"}).max(256, {"message": "The maximum password length is 256 characters"}),


  });


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      displayName: "",
      password: ""
    },
  });


  const signUp = async (creds) => {

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      "email": creds.email,
      "password": creds.password
    });


    if(error)
    {
      form.setError("password", {"message": error.message})
    }

    else{

      await supabase
        .from("Account")
        .insert({
          "user": data.user.id,
          "bio": "",
          "link": "",
          "displayName": creds.displayName,
          "fullName": creds.fullName
        });


      toast({
        title: "Success",
        description: "Successfully signed up!"
      });

      window.location.reload();

    }

    setLoading(false);
  }


  const LoadingSkeleton = () => {
    return (
      <div className="w-full h-full flex flex-col justifty-center gap-5 p-5">

        <Skeleton className="h-12 w-[80%] rounded-md place-self-center" />
        <Skeleton className="h-12 w-[80%] rounded-md place-self-center" />
        <Skeleton className="h-12 w-[80%] rounded-md place-self-center" />


          <Skeleton className="h-10 w-[80%] rounded-md place-self-center" />

          <Skeleton className="h-10 w-[80%] rounded-md place-self-center" />
      </div>
    )
  }

  if(loading)
  {
    return <LoadingSkeleton />
  }


 return (
  <Form {...form} className="h-full w-full p-5 flex flex-col gap-5">
      <form onSubmit={form.handleSubmit(signUp)} className="flex flex-col py-10">


        <FormField
          control={form.control}
          name="fullName"
          render={({field}) => (
              <FormItem className="w-fit place-self-center">
                <FormControl>
                  <Input placeholder="Full Name" type="text" className="w-full min-w-[400px] place-self-start rounded-lg p-5" {...field} />
                </FormControl>

                 <div className="flex flex-row justifty-center p-2  max-w-fit place-self-start">
                  <FormMessage className="text-red-500" />
                </div>
              </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
              <FormItem className="w-fit place-self-center">
                <FormControl>
                  <Input placeholder="Email" type="email" className="w-full min-w-[400px] place-self-start rounded-lg p-5" {...field} />
                </FormControl>

                 <div className="flex flex-row justifty-center p-2  max-w-fit place-self-start">
                  <FormMessage className="text-red-500" />
                </div>
              </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="displayName"
          render={({field}) => (
              <FormItem className="w-fit place-self-center">
                <FormControl>
                  <Input placeholder="Display Name" type="text" className="w-full min-w-[400px] place-self-start rounded-lg p-5" {...field} />
                </FormControl>

                 <div className="flex flex-row justifty-center p-2  max-w-fit place-self-start">
                  <FormMessage className="text-red-500" />
                </div>
              </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
              <FormItem className="w-fit place-self-center">
                <FormControl>
                  <Input placeholder="Password" type="password" className="w-full min-w-[400px] place-self-start rounded-lg p-5" {...field} />
                </FormControl>

                 <div className="flex flex-row justifty-center p-2  max-w-fit place-self-start">
                  <FormMessage className="text-red-500" />
                </div>
              </FormItem>
          )}
        />



        <Button className="max-w-[400px] w-full place-self-center">
          Signup
        </Button>
      </form>
  </Form>
 )
}





