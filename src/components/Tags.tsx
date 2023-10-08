import { TagsColor } from "constants/images";
import React from "react";
import { ITags } from "types/interface";

const Tags = ({ tags }: { tags: ITags[] }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags?.map((item, tagIndex) =>
        TagsColor.map(
          (color, index) =>
            tagIndex === index && (
              <div
                key={item.id}
                id="tags"
                className={`${color} flex items-center rounded px-2 py-1 text-xs text-white font-medium whitespace-nowrap`}
              >
                <span>{item.name}</span>
              </div>
            )
        )
      )}
    </div>
  );
};

export default Tags;
