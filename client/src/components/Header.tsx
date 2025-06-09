import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
        <div className="left-section">
            자료 공유 사이트
        </div>
        <nav className="right-nav">
            <Link to="/post" className="nav-link">Post</Link>
            <Link to="/write" className="nav-link">Write</Link>
        </nav>
    </header>
  );
}
