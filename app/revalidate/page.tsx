import { revalidateTag } from "next/cache";

type Props = {};

const RevalidateButton = ({ tag }: { tag: string }) => {
  const handleClick = async () => {
    "use server";
    console.log("Revalidate", tag);
    revalidateTag(tag);
  };
  return (
    <form action={handleClick}>
      <button className="px-4 py-2 rounded bg-green-400">
        Revalidate {tag}
      </button>
    </form>
  );
};

const RevalidatePage = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 justify-start items-start">
      <div>RevalidatePage</div>
      <RevalidateButton tag="A" />
      <RevalidateButton tag="B" />
      <RevalidateButton tag="ALL" />
    </div>
  );
};

export default RevalidatePage;
