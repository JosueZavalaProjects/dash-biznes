import BarChart from "@/components/BarChart";
import { CardContent } from "@/components/Card";
import { Cards } from "@/components/dashboard/Cards";
import { Sales } from "@/components/dashboard/Sales";
import PageTitle from "@/components/PageTitle";

export default function Home() {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        <Cards />
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Utilidad general</p>

          <BarChart />
        </CardContent>
        <Sales />
      </section>
    </div>
  );
}
