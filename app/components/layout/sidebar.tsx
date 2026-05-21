import { NavLink, Link } from "react-router";

type NavItem = { to: string; label: string };

const navItems: NavItem[] = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/customers", label: "Customers" },
    { to: "/admin/promos", label: "Promos" },
];

const Sidebar = () => {
    return (
        <aside className="flex h-screen w-60 flex-col border-r border-gray-200 bg-white">
            <div className="px-6 py-5">
                <Link to="/admin" className="text-lg font-semibold text-gray-900">
                    Shoply Admin
                </Link>
            </div>
            <hr className="border-gray-200" />
            <nav className="flex-1 px-3 py-4">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.to === "/admin"}
                                className={({ isActive }) =>
                                    [
                                        "block rounded-md px-4 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 hover:bg-gray-100",
                                    ].join(" ")
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="border-t border-gray-200 p-4">
                <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-900">Admin</p>
                    <p className="text-xs text-gray-500">admin@shoply.com</p>
                </div>
                <div className="space-y-2">
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                        View store ↗
                    </a>
                    <button
                        type="button"
                        onClick={() => {
                            /* call your sign-out action here */
                        }}
                        className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </aside >
    );
};

export default Sidebar;