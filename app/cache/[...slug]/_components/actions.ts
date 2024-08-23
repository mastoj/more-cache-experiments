"use server";

import { getData } from "@/app/utils/api-client";

export const runAction = async ({
  revalidateTime,
  slug,
  tags,
}: {
  revalidateTime: number;
  slug: string[];
  tags: string[];
}) => {
  const data = await getData({
    revalidationTime: revalidateTime,
    slug: slug,
    tags: tags,
  });
  return data;
};
