"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  tripName: z.string().min(2).max(20),
  source: z.string().min(2).max(15),
  destination: z.string().min(2).max(15),
  people: z.coerce.number(),
});

const ItenaryForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripName: "",
      source: "",
      destination: "",
      people: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="outerFormDiv flex flex-col gap-y-2 p-2 w-full">
            <FormField
              control={form.control}
              name="tripName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Trip's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Trip Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Where to start ? </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Source" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Where are you heading ? </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Destination" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="people"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How many people ? </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter number of person" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="cursor-pointer"
            type="submit"
            onClick={() => router.push("/myTripsDashboard")}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ItenaryForm;
