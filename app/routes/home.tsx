import React from "react";
import { Navigate } from "react-router";

export default function Home() {
	return <Navigate to="/step/1" replace />;
}
