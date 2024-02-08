import Logout from '../pages/logout';
import Link from 'next/link';

const Header = ({ setIsAuthenticated }) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/realizations">
              Department Realizations
            </Link>
          </li>
          <li>
            <Link href="/provisions">
              Provisions
            </Link>
          </li>
          <li>
            <Link href="/reports">
              Reports
            </Link>
          </li>
        </ul>
      </nav>
      <Logout setIsAuthenticated={setIsAuthenticated} />
    </header>
  );
};

export default Header;
