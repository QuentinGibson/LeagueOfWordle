import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "League Of Wordle" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <div>
      <h1>Index</h1>
    </div>
  );
}
