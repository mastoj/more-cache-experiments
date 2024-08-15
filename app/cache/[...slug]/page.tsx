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
  const response = await fetch(
    `http://localhost:3000/api/date/${componentSlug}`,
    {
      next: {
        revalidate: props.revalidateTime,
        tags: ["all", ...props.tags],
      },
    }
  );
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
