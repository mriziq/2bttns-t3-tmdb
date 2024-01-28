import { unstable_noStore as noStore } from "next/cache";
import { api } from "~/trpc/server";
import PhoneNumberForm from "./_components/phoneNumberForm";
import { twobttns } from "~/server/twobttns.ts";


function generatePlayURL(phoneNumber: string) {

  const url = twobttns.generatePlayUrl(
    {
      gameId: "your-awesome-game",
      playerId: phoneNumber,
      numItems: "ALL",
      callbackUrl: "https://example.com/callback",
    }
  );

  return (
    url
  )
}

export default async function Home() {
  
  noStore();

  const playURL = generatePlayURL("12345678")
  const hello = await api.post.hello.query({ text: playURL });
  console.log(hello.greeting)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-3xl font-bold">
          t3 + 2bttns + TMDB
        </h1>
        <PhoneNumberForm />
      </div>
    </main>
  );
}


