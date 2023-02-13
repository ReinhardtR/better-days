import { Angry, Frown, Laugh, Meh, Smile } from "lucide-react";
import { useState } from "react";
import { MoodState } from "@prisma/client";
import { classNames } from "~/utils/classNames";

const MOOD_OPTIONS = [
  {
    mood: MoodState.GREAT,
    Icon: Laugh,
    colorClasses: "text-sky-400 dark:text-sky-500",
  },
  {
    mood: MoodState.GOOD,
    Icon: Smile,
    colorClasses: "text-green-400 dark:text-green-500",
  },
  {
    mood: MoodState.OKAY,
    Icon: Meh,
    colorClasses: "text-yellow-400 dark:text-yellow-500",
  },
  {
    mood: MoodState.BAD,
    Icon: Frown,
    colorClasses: "text-orange-400 dark:text-orange-500",
  },
  {
    mood: MoodState.TERRIBLE,
    Icon: Angry,
    colorClasses: "text-red-400 dark:text-red-500",
  },
];

export function Mood() {
  const [mood, setMood] = useState<MoodState | null>(null);

  return (
    <div className="flex h-full items-center justify-center space-x-4 p-4">
      {MOOD_OPTIONS.map((option) => (
        <MoodOption
          key={option.mood}
          className={option.colorClasses}
          Icon={option.Icon}
          isSelected={mood === option.mood}
          onClick={() => setMood(option.mood)}
        />
      ))}
    </div>
  );
}

interface MoodOptionProps extends React.HTMLAttributes<SVGElement> {
  Icon: React.ComponentType<React.ComponentProps<"svg">>;
  isSelected: boolean;
}

function MoodOption({
  Icon,
  isSelected,
  className,
  onClick,
  ...props
}: MoodOptionProps) {
  return (
    <Icon
      onClick={onClick}
      className={classNames(
        "h-14 w-14 transition-all hover:cursor-pointer",
        isSelected ? "scale-125 opacity-100" : "opacity-50 hover:scale-110",
        className
      )}
      {...props}
    />
  );
}
