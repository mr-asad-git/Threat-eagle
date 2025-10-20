
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
  <nav className="backdrop-blur-md bg-black/70 shadow-2xl py-2 px-4 md:py-3 md:px-8 flex flex-col md:flex-row justify-between items-center fixed top-0 w-full z-50 border-b border-yellow-400">
      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-0">
        <img src="/logo192.png" alt="Threat Eagle Logo" className="w-7 h-7 md:w-8 md:h-8 rounded-full shadow-lg border-2 border-yellow-400" />
        <h1 className="text-lg md:text-2xl font-extrabold text-yellow-400 tracking-widest drop-shadow-lg font-sans ">
          Threat Eagle
        </h1>
      </div>
  <ul className="flex flex-wrap justify-center md:justify-end space-x-1 md:space-x-4 bg-black/40 rounded-2xl px-2 py-1 shadow-md text-sm w-full md:w-auto">
        {['Home', 'Trial', 'About','Contact', 'Login'].map((item) => {
          const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
          const isActive = location.pathname === path;

          if (item === 'Login') {
            return (
              <li key={item} className="w-full md:w-auto">
                <Link
                  to={path}
                  className={`relative inline-block text-center px-2 py-1 font-bold transition-all duration-300 text-md tracking-wide focus:outline-none ${
                    isActive
                      ? 'text-yellow-400'
                      : 'text-yellow-400 bg-black/80 hover:text-black hover:bg-yellow-400 rounded-md '
                  }`}
                >
                  {item}
                  <span
                    className={`absolute left-0 bottom-0 w-full h-0.5 transition-all duration-300 ${
                      isActive
                        ? 'bg-yellow-400 scale-x-100 shadow-[0_4px_16px_0_rgba(255,193,7,0.7)] animate-bounce'
                        : 'bg-yellow-400 scale-x-0 group-hover:scale-x-100 shadow-[0_4px_16px_0_rgba(255,193,7,0.7)] group-hover:animate-bounce'
                    }`}
                    style={{ transformOrigin: 'left' }}
                  />
                </Link>
              </li>
            );
          }
          return (
            <li key={item} className="relative group">
              <Link
                to={path}
                className={`relative inline-block text-center px-2 py-1 font-semibold transition-all duration-300 text-md tracking-wide focus:outline-none ${
                  isActive
                    ? 'text-yellow-400'
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                {item}
                <span
                  className={`absolute left-0 bottom-0 w-full h-0.5 transition-all duration-300 ${
                    isActive
                      ? 'bg-yellow-400 scale-x-100 shadow-[0_4px_16px_0_rgba(255,193,7,0.7)]'
                      : 'bg-yellow-400 scale-x-0 group-hover:scale-x-100 shadow-[0_4px_16px_0_rgba(255,193,7,0.7)]'
                  }`}
                  style={{ transformOrigin: 'left' }}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


