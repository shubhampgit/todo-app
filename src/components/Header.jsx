const Header = () => {
  return (
    <header className="sticky w-full bg-black text-white">
        <div
            className="
            w-full
            px-3 sm:px-4
            py-3
            sm:max-w-3xl sm:mx-auto
            "
        >
            <div className="flex items-center gap-2">
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
      </div>
    </header>
  );
};

export default Header;
