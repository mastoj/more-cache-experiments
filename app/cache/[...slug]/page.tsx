import { env } from "process";

export const generateStaticParams = () => [];
export const revalidate = 30;

type Props = {
  params: {
    slug: string[];
  };
};

const CachedComponent = async (
  props: Props & { tags: string[]; revalidateTime: number }
) => {
  const componentSlug = `${props.revalidateTime}/${props.params.slug.join(
    "/"
  )}`;
  const url =
    env.ENVIRONMENT === "production"
      ? `https://${env.VERCEL_URL}`
      : "http://localhost:3000";
  const response = await fetch(`${url}/api/date/${componentSlug}`, {
    next: {
      revalidate: props.revalidateTime,
      tags: ["all", ...props.tags],
    },
  });
  const data = await response.json();
  return (
    <div>
      <div>CachePages: {componentSlug}</div>
      <div>Date: {data.date}</div>
    </div>
  );
};
const CachePages = async (props: Props) => {
  return (
    <div>
      <div>CachePages: {props.params.slug.join(",")}</div>
      <CachedComponent {...props} revalidateTime={10} tags={["A", "ALL"]} />
      <CachedComponent {...props} revalidateTime={20} tags={["B", "ALL"]} />
    </div>
  );
};

export default CachePages;
