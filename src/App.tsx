import LandingMessage from "./LandingMessage";
import Alert from "./Alert";

function App() {
  const users = ["User 1", "User 2", "User 3"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <Alert>
        <h1 className="inline">TETETE</h1>
      </Alert>

      <LandingMessage
        heading={"Test"}
        items={users}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
