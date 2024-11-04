
import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";
import Body from "@/components/homePage/Body";
export default function Home() {
  return (
    <div  className="flex mx-2  lg:mx-6 my-3 ">
       {/* left bar  */}
       <div className="hidden lg:flex md:w-[20%] sticky top-0 h-screen ">     
          <LeftBar/>
       </div>

       {/* body  */}
       <div className="w-full lg:w-[55%]">
            <Body/>
            
       
       
       </div>

       {/* side bar */}
       <div className="hidden lg:flex md:w-[25%]">
         <RightBar/>
       </div>

    </div>
  );
}
