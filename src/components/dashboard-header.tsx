// import { auth, signOut } from "@/auth";
// import { Button } from "@/components/ui/button";
// import { LogOut, User as UserIcon } from "lucide-react";

// export async function DashboardHeader() {
//   const session = await auth();

//   return (
//     <header className="border-b bg-white">
//       <div className="flex h-16 items-center justify-between px-6">
//         <div className="flex items-center gap-4">
//           <div className="bg-blue-600 p-2 rounded-lg">
//             <span className="text-white font-bold text-xl">A</span>
//           </div>
//           <h2 className="text-lg font-semibold text-gray-800 hidden md:block">
//             Dashboard
//           </h2>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-3 mr-4 border-r pr-4">
//             {session?.user?.image ? (
//               <img 
//                 src={session.user.image} 
//                 className="w-8 h-8 rounded-full border" 
//                 alt="Avatar"
//               />
//             ) : (
//               <div className="bg-gray-100 p-1 rounded-full">
//                 <UserIcon className="w-5 h-5 text-gray-500" />
//               </div>
//             )}
//             <span className="text-sm font-medium text-gray-700 hidden sm:block">
//               {session?.user?.name}
//             </span>
//           </div>

//           <form action={async () => {
//             "use server";
//             await signOut({ redirectTo: "/login" });
//           }}>
//             <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
//               <LogOut className="w-4 h-4 mr-2" />
//               Sair
//             </Button>
//           </form>
//         </div>
//       </div>
//     </header>
//   );
// }

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export async function DashboardHeader() {
  const session = await auth();

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-gray-600 hover:text-gray-900" />
          
          <div className="bg-blue-600 p-2 rounded-lg">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 hidden md:block">
            Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 mr-4 border-r pr-4">
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                className="w-8 h-8 rounded-full border" 
                alt="Avatar"
              />
            ) : (
              <div className="bg-gray-100 p-1 rounded-full">
                <UserIcon className="w-5 h-5 text-gray-500" />
              </div>
            )}
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {session?.user?.name}
            </span>
          </div>

          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}