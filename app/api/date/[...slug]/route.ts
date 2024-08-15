import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: {
    params: {
      slug: string[];
    };
  }
) => {
  return NextResponse.json({
    slug: context.params.slug,
    date: new Date().toISOString(),
  });
};
