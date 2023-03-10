import { FaCar, FaUserFriends, FaTools } from "react-icons/fa";
import Link from "next/link";

const sidebar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 m-0 flex h-screen w-24 flex-col border-r border-gray-200 bg-white p-6 text-color-dark">
        <Link href={"/clientes"}>
          <SideBarIcon icon={<FaUserFriends />} text="Clientes" />
        </Link>
        <Link href={"/servicios"}>
          <SideBarIcon icon={<FaTools />} text="Servicios" />
        </Link>
        <Link href={"/vehiculos"}>
          <SideBarIcon icon={<FaCar />} text="Vehiculos" />
        </Link>
      </div>
    </>
  );
};

const SideBarIcon = ({ icon, text }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

export default sidebar;
