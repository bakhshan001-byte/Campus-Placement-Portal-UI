import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GraduationCap, LogOut, LayoutDashboard, Home, ShieldCheck, User as UserIcon } from 'lucide-react';
import Swal from 'sweetalert2';

const navStyles = `
  .cpp-nav {
    background: #0b1220;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .cpp-brand-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: linear-gradient(135deg, #0ea5e9, #2563eb);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
  .cpp-link {
    color: rgba(255, 255, 255, 0.72) !important;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.65rem 0.9rem !important;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
  }
  .cpp-link:hover {
    color: #ffffff !important;
    background: rgba(255, 255, 255, 0.06);
  }
  .cpp-link.active {
    color: #38bdf8 !important;
    background: rgba(56, 189, 248, 0.12);
  }
  .cpp-link-admin {
    color: #f87171 !important;
  }
  .cpp-link-admin.active {
    color: #f87171 !important;
    background: rgba(248, 113, 113, 0.12);
  }
  .cpp-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .cpp-profile:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  .cpp-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #38bdf8;
    flex-shrink: 0;
  }
  .cpp-avatar-fallback {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #38bdf8;
    color: #0b1220;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .cpp-role {
    font-size: 0.68rem;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: #38bdf8;
    font-weight: 600;
  }
  .cpp-logout {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid rgba(248, 113, 113, 0.5);
    color: #f87171;
    background: transparent;
    border-radius: 10px;
    padding: 9px 16px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }
  .cpp-logout:hover {
    background: #dc2626;
    border-color: #dc2626;
    color: #fff;
  }

  @media (max-width: 991.98px) {
    .cpp-menu {
      margin-top: 14px;
      padding: 12px;
      background: #111a2e;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
    }
    .cpp-actions {
      flex-direction: column;
      align-items: stretch !important;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      margin-top: 12px;
      padding-top: 14px;
    }
    .cpp-actions .btn,
    .cpp-logout {
      width: 100%;
    }
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const closeMenu = () => setIsOpen(false);

  const linkClass = ({ isActive }) => `nav-link cpp-link${isActive ? ' active' : ''}`;
  const adminLinkClass = ({ isActive }) => `nav-link cpp-link cpp-link-admin${isActive ? ' active' : ''}`;

  const handleLogout = () => {
    Swal.fire({
      title: 'Ready to Leave?',
      text: 'You will be securely logged out of the portal.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login';
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3 sticky-top cpp-nav">
      <style>{navStyles}</style>

      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center m-0" to="/" onClick={closeMenu}>
          <span className="cpp-brand-icon">
            <GraduationCap size={22} color="#fff" />
          </span>
          <span style={{ letterSpacing: '0.3px', fontSize: '1.05rem' }}>Campus Placement Portal</span>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse cpp-menu ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-0 ms-lg-4 gap-lg-1">
            <li className="nav-item">
              <NavLink className={linkClass} to="/" end onClick={closeMenu}>
                <Home size={17} /> Home
              </NavLink>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <NavLink className={linkClass} to="/dashboard" onClick={closeMenu}>
                    <LayoutDashboard size={17} /> Dashboard
                  </NavLink>
                </li>
                {/* ADMIN LINK - SIRF ADMIN KO DIKHEGA */}
                {user.role === 'ADMIN' && (
                  <li className="nav-item">
                    <NavLink className={adminLinkClass} to="/admin" onClick={closeMenu}>
                      <ShieldCheck size={17} /> Admin Panel
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0 cpp-actions">
            {user ? (
              <>
                <Link to="/profile" className="cpp-profile" onClick={closeMenu}>
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="Profile" className="cpp-avatar" />
                  ) : (
                    <div className="cpp-avatar-fallback">
                      <UserIcon size={18} />
                    </div>
                  )}
                  <div style={{ lineHeight: 1.2 }}>
                    <div className="text-white fw-semibold" style={{ fontSize: '0.92rem' }}>{user.name}</div>
                    <div className="cpp-role">{user.role}</div>
                  </div>
                </Link>

                <button onClick={handleLogout} className="cpp-logout">
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold">Login</Link>
                <Link to="/register" onClick={closeMenu} className="btn btn-primary rounded-pill px-4 py-2 fw-semibold">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
