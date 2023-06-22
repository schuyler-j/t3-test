import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import getTree from "~/server/bst";
import { api } from "~/utils/api";
import runProm from "~/server/other";
import { text } from "stream/consumers";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from Binary Search Tree" });
  const btn =
    "rounded-full bg-white px-10 py-3 font-semibold text-gray-800 no-underline transition hover:bg-purple-400";

  let inserttextarea: HTMLTextAreaElement | null = null;
  let removetextarea: HTMLTextAreaElement | null = null;

  if (typeof window !== "undefined") {
    inserttextarea = document.getElementById(
      "insertNodeValue"
    ) as HTMLTextAreaElement;
    removetextarea = document.getElementById(
      "removeNodeValue"
    ) as HTMLTextAreaElement;
  }
  const insert = "Insert Node";
  const remove = "Remove Node";
  const print = "Print in-order";
  const printpost = "Print post-order";
  const printpre = "Print pre-order";
  let nodeValue: number;
  nodeValue = 0;

  function getTextAreaValue(textarea: HTMLTextAreaElement): number {
    return parseInt(textarea.value);
  }

  function updateNodeValue(textarea: HTMLTextAreaElement) {
    nodeValue = parseInt(textarea.value);
  }

  inserttextarea?.addEventListener("keyup", () =>
    updateNodeValue(inserttextarea!)
  );
  removetextarea?.addEventListener("keyup", () =>
    updateNodeValue(removetextarea!)
  );

  return (
    <>
      <Head>
        <title>Test App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Binary <span className="text-[hsl(280,100%,70%)]">Search</span> Tree
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
            <div className="text-white">
              <a href="/home">More!</a>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <div>
                <div className="p-10"></div>
                <textarea
                  id="insertNodeValue"
                  className="resize-none rounded-md bg-slate-950 p-0 py-2 text-center text-white"
                  placeholder=""
                  title="node_value"
                >
                  {nodeValue}
                </textarea>
                <div className="p-5"></div>
                <button
                  className="rounded-full bg-white px-10 py-3 font-semibold text-gray-800 no-underline transition hover:bg-purple-400"
                  onClick={() => set(getTextAreaValue(inserttextarea!))}
                >
                  {insert}
                </button>
              </div>
              <div>
                <div className="p-10"></div>
                <textarea
                  id="removeNodeValue"
                  className="resize-none rounded-md bg-slate-950 p-0 py-2 text-center text-white"
                  placeholder=""
                  title="node_value"
                >
                  {nodeValue}
                </textarea>
                <div className="p-5"></div>
                <button
                  className="rounded-full bg-white px-10 py-3 font-semibold text-gray-800 no-underline transition hover:bg-purple-400"
                  onClick={() =>
                    void removeNode(getTextAreaValue(removetextarea!))
                  }
                >
                  {remove}
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-1 gap-4">
            <button
              className="rounded-full bg-white px-10 py-3 font-semibold text-gray-800 no-underline transition hover:bg-purple-400"
              onClick={() => void searchTree("inorder")}
            >
              {print}
            </button>
            <button
              className="rounded-full bg-white px-10 py-3 font-semibold text-gray-800 no-underline transition hover:bg-purple-400"
              onClick={() => void searchTree("preorder")}
            >
              {printpre}
            </button>
            <button
              className="rounded-full bg-white px-10 py-3 font-semibold text-gray-800 no-underline transition hover:bg-purple-400"
              onClick={() => void searchTree("postorder")}
            >
              {printpost}
            </button>
          </div>
        </div>
        <div className="border-white">
          <button className={btn} onClick={() => void runProm("192.168.0.10")}>
            Run
          </button>
        </div>
      </main>
    </>
  );
}

function removeNode(value: number) {
  const BSTree = getTree();
  console.log("node to remove", BSTree.find(BSTree.head, value));
}

function searchTree(order: string) {
  const BSTree = getTree();
  const root = BSTree.traverse(BSTree.head, order);
}

function set(value: number) {
  const BSTree = getTree();
  BSTree.insert(BSTree.head, value);
  console.log(BSTree);
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}

function BinaryTree() {
  const node_style =
    "h-12 w-12 rounded-full bg-black text-center align-middle text-white";

  return <div></div>;
}
