import { useState } from "react";

// PascalCase
function LandingMessage() {
  // JSX JavaScript XML
  const username = "Test User";

  const users = ["User 1", "User 2", "User 3"];

  // Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello {username}</h1>

      {users.length === 0 && <p>No users found</p>}

      <ul className="max-w-md space-y-1 list-disc list-inside">
        {users.map((item, idx) => (
          <li
            className={selectedIndex === idx ? "text-red-500" : ""}
            key={idx}
            onClick={() => setSelectedIndex(idx)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default LandingMessage;
