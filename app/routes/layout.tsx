import React from "react";
import { Outlet } from "react-router";
import { ProcessSteps } from "../components/ProcessSteps";

export default function Layout() {
	return (
		<div className="flex flex-col items-center p-6">
			<ProcessSteps />

			<div className="mt-7 w-full max-w-6xl border rounded-xl p-10 shadow">
				<Outlet />
			</div>
		</div>
	);
}
