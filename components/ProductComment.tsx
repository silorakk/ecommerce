/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { FormEvent, Fragment, useState } from "react";
import {
  CheckBadgeIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/outline";
import Rating from "./Rating";
import Tooltip from "./Tooltip";

const moods = [
  {
    name: "1 star",
    value: "excited",
    icon: StarIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  userName: string;
  message: string;
  rating: number;
  isVerified: boolean;
}

export default function ProductComment({
  userName,
  message,
  rating,
  isVerified,
}: Props) {
  return (
    <div className="flex items-start space-x-4 py-4">
      <div className="w-32">
        <div className="flex items-center">
          <span className="flex-shrink-0 font-semibold break-words">
            {userName}
          </span>
          {isVerified && (
            <Tooltip text="This user has previously purchased this item.">
              <CheckBadgeIcon height={20} color="#34568b" />
            </Tooltip>
          )}
        </div>
        <Rating value={rating} key={userName} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="rounded-lg shadow-sm ring-1 ring-inset break-words ring-gray-300  focus-within:ring-2 focus-within:ring-indigo-600">
          <p className="p-2 whitespace-normal">{message}</p>
        </div>
      </div>
    </div>
  );
}
