function Header() {
  return (
    <header className="w-full px-4 lg:px-[100px]">
      <div className="main_nav w-full p-4 py-[30px] flex items-center justify-between">
        <h1 className={`text-2xl font-extrabold`}>Let's Play Chess</h1>
        <div className="nav_link">
          <a
            className="bg-black text-white px-4 py-2.5 rounded-md"
            href="/login"
          >
            Login
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
