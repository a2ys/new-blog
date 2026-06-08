"use client";

import dynamic from "next/dynamic";

const NewArticleEditor = dynamic(
  () => import("./NewArticleEditor").then((m) => m.NewArticleEditor),
  { ssr: false, loading: () => null },
);

export { NewArticleEditor };
