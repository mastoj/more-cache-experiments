import { getData } from "@/app/utils/api-client";
import ServerActionComponent from "./_components/ServerActionComponent";

export const generateStaticParams = () => [];
export const revalidate = 3000;

type Props = {
  params: {
    slug: string[];
  };
};

const CachedComponent = async (
  props: Props & { tags: string[]; revalidateTime: number }
) => {
  console.log("==> CachedComponent", props);
  const componentSlug = `${props.revalidateTime}/${props.params.slug.join(
    "/"
  )}`;
  const data = await getData({
    revalidationTime: props.revalidateTime,
    slug: props.params.slug,
    tags: props.tags,
  });
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
      <CachedComponent {...props} revalidateTime={1000} tags={["A", "ALL"]} />
      <CachedComponent {...props} revalidateTime={2000} tags={["B", "ALL"]} />
      <ServerActionComponent />
    </div>
  );
};

export default CachePages;
