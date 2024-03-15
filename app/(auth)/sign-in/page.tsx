"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSchema } from "@/schemas/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginForm() {
	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		const signInData = await signIn("credentials", {
			email: values.email,
			password: values.password,
			redirect: true
		})
		if(signInData?.error) {
			console.log(signInData.error)
		} else {
			router.push("/admin")
		}
	};
	return (
		<div className="container space-y-4 w-[500px] flex flex-col items-center justify-center min-h-screen">
			<h2 className="font-extrabold text-3xl mb-5 text-center">
				Welcome back, Login to your account
			</h2>
			<p className="text-center">
				Take advantage of our services by logging into your account.
			</p>
			<Form {...form}>
				<form
					className=" space-y-5 w-[450px]  p-5 shadow-2xl rounded-sm"
					onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-bold text-md" htmlFor="email">
									Email
								</FormLabel>
								<FormControl>
									<Input
										className="rounded-none"
										type="email"
										id="email"
										{...field}
									/>
								</FormControl>
								<FormMessage>
									{form.formState.errors.email?.message}
								</FormMessage>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-bold text-md" htmlFor="password">
									Password
								</FormLabel>
								<FormControl>
									<Input
										className="rounded-none"
										type="password"
										id="password"
										{...field}
									/>
								</FormControl>
								<FormMessage>
									{form.formState.errors.email?.message}
								</FormMessage>
							</FormItem>
						)}
					/>
					<Button
						className="w-full rounded-none uppercase tracking-widest text-lg font-bold"
						type="submit">
						Login
					</Button>
					<p className="text-center">
						Don&apos;t have an account ?{" "}
						<Link href="/sign-up" className="text-blue-500">
							Create one now
						</Link>
					</p>
				</form>
			</Form>
		</div>
	);
}
