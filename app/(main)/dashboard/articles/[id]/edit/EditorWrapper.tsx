"use client";

import dynamic from "next/dynamic";

const EditArticleEditor = dynamic(
  () => import("./EditArticleEditor").then((m) => m.EditArticleEditor),
  { ssr: false, loading: () => null },
);

export { EditArticleEditor };
