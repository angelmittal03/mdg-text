import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import Editor from "../islands/Editor.tsx";
import chalk from "npm:chalk@5";
import io from "npm:socket.io-client@4.7.2";



export default async function  Home() {
console.log(chalk.yellow("Hello!"));
const socket = await io("http://localhost:8080/")
 
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Editor conn={socket}/>
      </div>
    </div>
  );
}
