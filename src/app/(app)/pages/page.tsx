import { Suspense } from "react";

import Loading from "@/app/loading";
import PageList from "@/components/pages/PageList";
import { getPages } from "@/lib/api/pages/queries";

import { checkAuth } from "@/lib/auth/utils";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";

export const revalidate = 0;

export default async function PagesPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Pages</h1>
        </div>
        <Pages />
      </div>
    </main>
  );
}

const Pages = async () => {
  await checkAuth();
  const { isSubscribed } = await getUserSubscriptionPlan();

  const { pages } = await getPages();

  return (
    <Suspense fallback={<Loading />}>
      <PageList pages={pages} isSubscribed={Boolean(isSubscribed)} />
    </Suspense>
  );
};
