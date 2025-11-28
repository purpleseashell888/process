import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getStatusText } from "../../utils/getStatusText";
import steps from "../../data/steps";
import StepCard from "../StepCard";

export function ProcessSteps() {
  const navigate = useNavigate();
  const params = useParams();
  const rawId = params.id;
  const urlStep = (() => {
    const n = Number(rawId);
    if (Number.isNaN(n) || n < 1) return 0; // 默认第 0 个
    if (n > steps.length) return steps.length - 1;
    return n - 1; // 步骤从 1 开始，索引从 0 开始
  })();
  const [currentStep, setCurrentStep] = useState<number>(urlStep);
  const [progressMap, setProgressMap] = useState<Record<number, number>>({});
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const restored: Record<number, number> = {};

    for (let i = 0; i < urlStep; i++) {
      restored[i] = 100;
    }

    restored[urlStep] = 0;

    setProgressMap(restored);
    setCurrentStep(urlStep);
  }, []);

  useEffect(() => {
    startStep(currentStep);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const startStep = (index: number) => {
    const step = steps[index];
    if (!step) return;

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = null;

    setProgressMap((prev) => ({ ...prev, [index]: 0 }));

    if (!step.progress) {
      animateProgress(index, 0, 100, 1000);
    } else {
      const keys = Object.keys(step.progress).map(Number);
      const totalSec = Math.max(...keys);
      const totalDuration = totalSec * 1000;

      animateProgress(index, 0, 100, totalDuration);
    }
  };

  const animateProgress = (
    index: number,
    start: number,
    end: number,
    duration: number,
    callback?: () => void
  ) => {
    const diff = end - start;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(start + (diff * elapsed) / duration, end);

      setProgressMap((prev) => ({ ...prev, [index]: progress }));

      if (progress < end) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
        if (callback) callback();
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleNext = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = null;

    setProgressMap((prev) => ({
      ...prev,
      [currentStep]: 100,
    }));

    const nextStep = Math.min(currentStep + 1, steps.length - 1);

    navigate(`/step/${nextStep + 1}`);
    setCurrentStep(nextStep);
  };

  return (
    <main className="flex flex-col items-center justify-center pt-30 pb-30">
      <div className="flex gap-16">
        {steps.map((s, i) => (
          <StepCard
            key={s.id}
            step={s}
            progress={progressMap[i] ?? 0}
            statusText={
              s.progress ? getStatusText(s.progress, progressMap[i] ?? 0) : ""
            }
          />
        ))}
      </div>

      <div
        className="mt-16 bg-blue-500 text-white px-4 py-2 rounded-xl text-sm cursor-pointer select-none"
        onClick={handleNext}
      >
        STEP++
      </div>
    </main>
  );
}
