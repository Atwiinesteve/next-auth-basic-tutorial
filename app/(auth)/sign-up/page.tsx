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
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function RegisterForm() {
	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});
	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		const response = await fetch("/api/user", {
			method: "POST",
			body: JSON.stringify({
				username: values.username,
				email: values.email,
				password: values.password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			router.push("/sign-in");
		} else {
			console.log("registration failed..");
		}
	};
	return (
		<div className="container space-y-4 w-[500px] flex flex-col items-center justify-center min-h-screen">
			<h2 className="font-extrabold text-3xl text-center mb-5">
				Register with us today
			</h2>
			<p className="text-center">
				Create an account with us today and experience the best of our services.
			</p>
			<Form {...form}>
				<form
					className=" space-y-5 w-[450px]  p-5 shadow-2xl rounded-sm"
					onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-bold text-md" htmlFor="username">
									Username
								</FormLabel>
								<FormControl>
									<Input
										className="rounded-none"
										type="text"
										id="username"
										{...field}
									/>
								</FormControl>
								<FormMessage>
									{form.formState.errors.username?.message}
								</FormMessage>
							</FormItem>
						)}
					/>
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
					<div className="flex flex-col items-center justify-center space-y-2">
						<Button
							className="w-full rounded-none capitalize tracking-widest text-sm"
							type="submit">
							Register with Email
						</Button>
						<div>or</div>
						<Button
							className="flex items-center justify-center w-full rounded-none tracking-widest text-sm"
							type="submit">
							<FaGithub size={24} className="mr-2" />
							Register with Github
						</Button>
						<Button
							className="w-full rounded-none capitalize tracking-widest text-sm"
							type="submit">
							<FcGoogle size={24} className="mr-2" />
							Register with Google
						</Button>
					</div>
					<p className="text-center">
						Already have an account ?{" "}
						<Link href="/sign-in" className="text-blue-500">
							Login now
						</Link>
					</p>
				</form>
			</Form>
		</div>
	);
}
