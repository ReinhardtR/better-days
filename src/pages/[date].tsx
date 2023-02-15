import { type NextPage } from "next";
import { withAuth } from "~/server/auth";
import { Card } from "~/components/Card";
import { Journal } from "~/components/Journal";
import { Layout } from "~/components/Layout";
import { Mood } from "~/components/Mood";
import { TaskList } from "~/components/TaskList";
import { classNames } from "~/utils/classNames";

const DailyReport: NextPage = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-[1000px] p-10">
        <div className="grid min-h-[750px] auto-rows-[150px] grid-cols-1 gap-y-16 gap-x-8 md-lg:grid-cols-2">
          <div className="row-span-1 md-lg:col-span-1 md-lg:col-start-1 md-lg:h-full">
            <CardWithTitle title="Overview">
              <div className="flex h-full items-center justify-center">
                <p className="text-xl font-semibold">
                  What&apos;s up Reinhardt? 👋
                </p>
              </div>
            </CardWithTitle>
          </div>
          <div className="row-span-3 md-lg:col-start-1 md-lg:row-span-4 md-lg:h-full">
            <CardWithTitle title="Journal">
              <Journal />
            </CardWithTitle>
          </div>
          <div className="row-span-2 md-lg:col-start-2 md-lg:row-start-1">
            <CardWithTitle title="Tasks">
              <TaskList />
            </CardWithTitle>
          </div>
          <div className="row-span-2 md-lg:col-start-2">
            <CardWithTitle title="Habits">
              <TaskList />
            </CardWithTitle>
          </div>
          <div className="row-span-1 md-lg:col-start-2">
            <CardWithTitle title="Mood">
              <Mood />
            </CardWithTitle>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DailyReport;

export const getServerSideProps = withAuth();

interface CardWithTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children?: React.ReactNode;
}

function CardWithTitle({
  title,
  className,
  children,
  ...props
}: CardWithTitleProps) {
  return (
    <div
      className={classNames("relative flex h-full flex-col", className)}
      {...props}
    >
      <p className="absolute inset-0 -top-8 h-8 text-xl font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <Card className="h-full">{children}</Card>
    </div>
  );
}
