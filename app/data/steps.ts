export interface Step {
	id: string;
	step: number;
	title: string;
	description: string;
	progress?: Record<number, string>;
}

const steps: Step[] = [
	{ id: "step_1", step: 1, title: "步骤一", description: "步骤一简介" },
	{
		id: "step_2",
		step: 2,
		title: "步骤二",
		description: "步骤二简介",
		progress: { 5: "加载中 1", 15: "加载中 2", 20: "加载中 3" },
	},
	{
		id: "step_3",
		step: 3,
		title: "步骤三",
		description: "步骤三简介",
		progress: { 6: "加载中 1", 8: "加载中 2" },
	},
	{
		id: "step_4",
		step: 4,
		title: "步骤四",
		description: "步骤四简介步骤四简介步骤四简介步骤四简介步骤四简介步骤四简介步骤四简介步骤四简介",
	},
];

export default steps;
