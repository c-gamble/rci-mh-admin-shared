import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-full flex flex-col items-center justify-center mb-8">
        <span className="text-3xl font-bold mb-2">RCI Mental Health Admin Portal</span>
        <p>You are currently <span className="font-boldw">signing up</span></p>
      </div>
      <div className="w-full flex items-center justify-center">
        <SignUp />
      </div>
    </div>
  )
}