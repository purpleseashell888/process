import React from "react";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import steps from "../../data/steps";
import StepCard from "../StepCard";
import { getStatusText } from "../../utils/getStatusText";

export function ProcessSteps() {
	const navigate = useNavigate();
	const params = useParams();

	// /step/3 → rawId = 3 → currentStep = 2
	const rawId = Number(params.id);
	const currentStep = isNaN(rawId) ? 0 : Math.min(rawId - 1, steps.length - 1);

	const [progressMap, setProgressMap] = useState<Record<number, number>>({});

	useEffect(() => {
		const newMap: Record<number, number> = {};

		for (let i = 0; i < steps.length; i++) {
			if (i < currentStep) {
				newMap[i] = 100; // 已完成
			} else if (i === currentStep) {
				newMap[i] = 0; // 当前步骤从 0 开始
			} else {
				newMap[i] = 0; // 后续步骤保持 0
			}
		}

		setProgressMap(newMap);
	}, [currentStep]);

	const handleNext = () => {
		const next = Math.min(currentStep + 1, steps.length - 1);
		navigate(`/step/${next + 1}`);
	};

	return (
		<main className="flex flex-col items-center justify-center pt-30 pb-30">
			<div className="flex gap-16">
				{steps.map((s, i) => (
					<StepCard
						key={s.id}
						step={s}
						progress={progressMap[i] ?? 0}
						statusText={s.progress ? getStatusText(s.progress, progressMap[i] ?? 0) : ""}
					/>
				))}
			</div>

			<button onClick={handleNext} className="mt-16 bg-blue-500 text-white px-4 py-2 rounded-xl text-sm">
				STEP++
			</button>
		</main>
	);
}
