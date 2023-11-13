import { useState } from "react";

interface Props {
  heading: string;
  items: string[];
  onSelectItem: (item: string) => void;
}

// PascalCase
function LandingMessage({ heading, items, onSelectItem }: Props) {
  // Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello {heading}</h1>

      {items.length === 0 && <p>No users found</p>}

      <ul className="max-w-md space-y-1 list-disc list-inside">
        {items.map((item, idx) => (
          <li
            className={selectedIndex === idx ? "text-red-500" : ""}
            key={idx}
            onClick={() => {
              setSelectedIndex(idx);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default LandingMessage;
