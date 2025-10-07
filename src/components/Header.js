import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <nav className="bg-black shadow-lg py-4 px-8 flex justify-between items-center fixed top-0 w-full z-50">
      <h1 className="text-3xl font-bold text-yellow-500 neon-text tracking-widest">
        Threat Eagle
      </h1>
      <ul className="flex space-x-6">
        {['Home', 'Scan', 'About', 'Login', 'Trial'].map((item) => {
          const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
          const isActive = location.pathname === path;

          return (
            <li key={item}>
              <Link
                to={path}
                className={`inline-block text-center px-5 py-2 rounded-3xl font-semibold bt-2 transition-all duration-200 ${
                isActive
                  ? ' text-white px-8 border-b-2 border-yellow-400'
                  : 'text-white border-yellow-500 hover:text-yellow-500 hover:border-b-2 hover:border-yellow-500'
              }`}



              >
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}