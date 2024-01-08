"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const TOOLS_BASE_PATH = "tools";
  const router = useRouter();

  const toolsMap = new Map<number, { id: number; name: string; link: string }>([
    [
      1,
      {
        id: 1,
        name: "CSV To JSON Converter",
        link: `${TOOLS_BASE_PATH}/csv-to-json`,
      },
    ],
    [
      2,
      { id: 2, name: "Guitar Tuner", link: `${TOOLS_BASE_PATH}/guitar-tuner` },
    ],
    [
      3,
      {
        id: 3,
        name: "Lorem Ipsum Generator",
        link: `${TOOLS_BASE_PATH}/lorem-ipsum-generator`,
      },
    ],
    [4, { id: 4, name: "MailMan Client", link: `${TOOLS_BASE_PATH}/mailman` }],
    [5, { id: 5, name: "TOOL5", link: `${TOOLS_BASE_PATH}/json-to-csv` }],
  ]);

  function goToToolPage(id: number) {
    router.push(toolsMap.get(id)?.link ?? "");
  }

  return (
    <div>
      {[...toolsMap.values()].map(({ id, name }) => {
        return (
          <div onClick={() => goToToolPage(id)} key={id}>
            {name}
          </div>
        );
      })}
    </div>
  );
}
