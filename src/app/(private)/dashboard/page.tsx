"use server";
import { JoinListNew } from "./_components/join-list-new";

export default async function Dashboard() {
  return (
    <>
      <div className="bg-background p-2">
        <JoinListNew />
      </div>
      <div className="">Lists</div>
    </>

    //     <main className="">
    //       <DashTabs lists={lists.data} hostedLists={hostedLists.data} />
    //       <div className="hidden md:grid md:grid-cols-3 md:mx-8 md:gap-4 hidden md:block ">
    //         <div>
    //           <img
    //             src="/Dashcard-1.png"
    //             alt="Create a new list for people to join"
    //             className="w-full rounded text-[--white]"
    //           />
    //           <HostedLists hostedLists={hostedLists.data} profile={profile.data} />
    //         </div>
    //         <div>
    //           <img
    //             src="/Dashcard-2.png"
    //             alt="See all the lists you have already joined"
    //             className="w-full rounded text-[--white]"
    //           />
    //           <Lists lists={lists.data} />
    //         </div>
    //         <div>
    //           <img
    //             src="/Dashcard-3.png"
    //             alt="Join an existing list by entering
    // their list code"
    //             className="w-full rounded text-[--white]"
    //           />
    //           <JoinList profile={profile.data} />
    //         </div>
    //       </div>
    //     </main>
  );
}
