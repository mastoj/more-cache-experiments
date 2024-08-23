import { env } from "process";

export const getData = async ({
  revalidationTime,
  slug,
  tags,
}: {
  revalidationTime: number;
  slug: string[];
  tags: string[];
}) => {
  console.log("==> getData", { revalidationTime, slug, tags });
  const url =
    env.VERCEL_ENV === "production" || env.VERCEL_ENV === "preview"
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000";
  console.log("==> Url", url);
  const response = await fetch(`${url}/api/date/${slug}`, {
    next: {
      revalidate: revalidationTime,
      tags: ["all", ...tags],
    },
  });
  const data = await response.json();
  return data;
};
