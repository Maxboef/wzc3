function Header() {
  return (
    <header className="bg-black text-slate-100 px-5 py-4 flex flex-row justify-between items-center">
      <h4 className="leading-7">Header</h4>

      <div className="inline px-4 py-2 bg-gray-200 text-black rounded">
        Log out
      </div>
    </header>
  );
}

export default Header;
