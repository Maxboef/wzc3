import LandingMessage from "./LandingMessage";

function Temp() {
  const users = ["User 1", "User 2", "User 3"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <>
      <LandingMessage
        heading={"Test"}
        items={users}
        onSelectItem={handleSelectItem}
      />
    </>
  );
}

export default Temp;
