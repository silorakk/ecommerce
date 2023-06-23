import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

interface Props {
  value: number;
  key: string;
}

export default function Rating({ key, value }: Props) {
  return value === 0 ? (
    <span>No Star</span>
  ) : (
    <div className="flex">
      {[...Array(value)].map((_, i) => (
        <StarIcon
          key={key}
          className="h-5 w-5 flex-shrink-0 text-yellow-300"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
