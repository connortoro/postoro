
import ToroBot from "@/app/components/toro-bot"

export default async function Page() {

  return (
    <div className="flex flex-col justify-center items-center outline-1 outline-neutral-50">
      <h1 className="translate-y-[20rem] translate-x-[-2rem] text-5xl font-bold text-neutral-200">Toro Bot</h1>
      <ToroBot/>
      
    </div>

  )
}
