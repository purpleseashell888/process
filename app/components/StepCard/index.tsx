import React from "react";
import type { Step } from "../../data/steps";

interface Props {
	step: Step;
	progress: number;
	statusText: string;
}

export default function StepCard({ step, progress, statusText }: Props) {
	return (
		<div className="w-full px-4">
			<div className="h-[150px] rounded-3xl border border-gray-200 p-6 shadow-sm">
				{/* header */}
				<div className="flex w-[250px] justify-between text-blue-500 ">
					<div className="font-semibold text-2xl">STEP {step.step}</div>
					<div className="w-[120px] text-right">
						<p className="truncate">{step.title}</p>
						<p className="truncate text-xs mt-1 text-blue-500">{step.description}</p>
					</div>
				</div>

				{/* progress bar */}
				<div className="mt-4 mb-3 bg-gray-300 rounded-full h-3 overflow-hidden">
					<div className="h-3 bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
				</div>

				{progress > 0 && progress < 100 && statusText && (
					<div className="flex justify-between text-xs text-gray-700">
						<span>{statusText}</span>
						<span>{Math.floor(progress)}%</span>
					</div>
				)}
			</div>
		</div>
	);
}
