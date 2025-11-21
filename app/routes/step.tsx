import { useParams } from "react-router";

export default function StepPage() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">当前步骤：{id}</h2>

      {id === "1" && <div>这是步骤一的内容</div>}
      {id === "2" && <div>这是步骤二的内容</div>}
      {id === "3" && <div>这是步骤三的内容</div>}
      {id === "4" && <div>这是步骤四的内容</div>}
    </div>
  );
}
