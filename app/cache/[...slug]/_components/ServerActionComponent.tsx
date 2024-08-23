"use client";

import { useState } from "react";
import { runAction } from "./actions";

type Props = {};

const ServerActionComponent = (props: Props) => {
  const [data, setData] = useState(null);
  const handleClick = async () => {
    const response = await runAction({
      revalidateTime: 10,
      slug: ["server-action"],
      tags: ["server-action"],
    });
    setData(response);
  };
  return (
    <div className="flex gap-4">
      ServerActionComponent
      <button
        className="px-4 py-2 bg-green-400 rounded-lg"
        onClick={handleClick}
      >
        Run action
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ServerActionComponent;
