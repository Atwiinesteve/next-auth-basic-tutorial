import bcryptjs from "bcryptjs";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { FormSchema } from "@/schemas/FormSchema";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { username, email, password } = FormSchema.parse(body);

		const existingUserByUsername = await db.user.findUnique({
			where: { username: username },
		});

		const existingUserByEmail = await db.user.findUnique({
			where: { email: email },
		});

		if (existingUserByUsername) {
			return NextResponse.json(
				{
					success: false,
					user: null,
					message: "Username is already registered!",
				},
				{ status: 409 },
			);
		}
		if (existingUserByEmail) {
			return NextResponse.json(
				{
					success: false,
					user: null,
					message: "Email is already registered!",
				},
				{ status: 409 },
			);
		}

		const hashedPassword = await bcryptjs.hash(password, 10);

		const newUser = await db.user.create({
			data: {
				username: username,
				email: email,
				password: hashedPassword,
			},
		});
		return NextResponse.json(
			{ user: newUser, success: true, message: "User created successfully!" },
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: true,
				message: "Something went wrong!",
			},
			{ status: 500 },
		);
	}
}
