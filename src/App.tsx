import LandingMessage from "./LandingMessage";

function App() {
  const users = ["User 1", "User 2", "User 3"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <LandingMessage
        heading={"Test"}
        items={users}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
