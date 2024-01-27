"use client";

import { useRouter } from "next/navigation";
import { TOOLS_LIST } from "./constants";

export default function Home() {
  const router = useRouter();

  const toolsMap = new Map<
    number,
    { id: number; name: string; link: string; underConstruction?: boolean }
  >(
    TOOLS_LIST.map((tool, id) => {
      return [id, { ...tool, id }];
    })
  );

  function goToToolPage(id: number) {
    router.push(toolsMap.get(id)?.link ?? "");
  }

  return (
    <div className="tools-container">
      {[...toolsMap.values()].map(({ id, name, underConstruction }) => {
        return (
          <div className="tool-card" onClick={() => goToToolPage(id)} key={id}>
            <div
              className={
                "rainbow-text " + (underConstruction ? "gray-hue-text" : "")
              }
            >
              {name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
