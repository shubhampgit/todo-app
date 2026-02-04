const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-black shadow-md">
      <div className="max-w-5xl mx-auto flex items-center gap-3 px-4 py-3 text-white">
        <img
          src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
          alt="logo"
          className="w-9 h-9"
        />
        <div>
          <h1 className="text-xl font-semibold">Todo App</h1>
          <p className="text-xs text-gray-300">
            Plan your day effectively
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
