import { ScrollArea } from "./ui/ScrollArea";
import { Separator } from "./ui/Separator";
import { CheckCircle, Circle as EmptyCircle } from "lucide-react";
import { useState } from "react";

const tasks = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `Task ${i}`,
  completed: false,
}));

export function TaskList() {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col p-8">
        {tasks.map((task, index) => (
          <div key={task.id} className="flex flex-col">
            <Task {...task} />
            {index !== tasks.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

type TaskProps = {
  id: number;
  name: string;
  completed: boolean;
};

function Task({ id, name, completed }: TaskProps) {
  const [isCompleted, setIsCompleted] = useState(completed);

  return (
    <div className="flex items-center space-x-4">
      {isCompleted ? (
        <CheckCircle
          className="h-7 w-7 text-green-600 transition-all hover:scale-110 hover:cursor-pointer dark:text-green-400"
          onClick={() => setIsCompleted(false)}
        />
      ) : (
        <EmptyCircle
          className="h-7 w-7 text-slate-400 transition-all hover:scale-110 hover:cursor-pointer dark:text-slate-500"
          onClick={() => setIsCompleted(true)}
        />
      )}
      <p className="text-lg font-medium">{name}</p>
    </div>
  );
}
