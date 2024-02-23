import { UserTable } from "../../Components";

export default function UserManagement() {
  return (
    <div className="w-full h-full text-black py-6 space-y-5 mt-10 md:mt-0">
      <div className="w-full px-3 md:pe-4">
        <div className="w-full h-20  bg-primary flex items-center justify-between px-3 md:px-10 rounded-md shadow-xl">
          <h1 className="md:text-xl text-base font-medium">Customers</h1>
        </div>
      </div>
      <div className="w-full h-fit pb-20 px-4 ">
        <div className="w-full h-full bg-transparent ">
          <UserTable />
        </div>
      </div>
    </div>
  );
}
