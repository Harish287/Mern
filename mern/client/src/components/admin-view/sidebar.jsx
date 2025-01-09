import { Boxes, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const AdminSidebarMenuItems = [
  {
    id: "dashboard",
    lable: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard />,
  },
  {
    id: "products",
    lable: "Products",
    path: "/admin/products",
    icons: <ShoppingBasket />,
  },
  {
    id: "orders",
    lable: "Orders",
    path: "/admin/orders",
    icons: <Boxes />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className=" mt-8 flex-col flex gap-2">
      {AdminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className=" flex items-center cursor-pointer text-xl rounded-md gap-2 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground
            "
        >
          {menuItem.icons}
          <span> {menuItem.lable}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className=" w-64">
          <div className=" flex flex-col h-full">
            <SheetHeader className=" border-b">
              <SheetTitle className=" flex gap-2">
                <ChartNoAxesCombined size={30} />
                <h2 className=" text-2xl font-extrabold mt-5 mb-5">
                  AdminPanel
                </h2>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className=" hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className=" flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h2 className=" text-2xl font-extrabold">AdminPanel</h2>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
