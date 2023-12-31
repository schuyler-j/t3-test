import { signIn, signOut, useSession } from "next-auth/react";
import getTree from "~/server/bst";
import { api } from "~/utils/api";
import Link from "next/link";
import Grid from "~/components/grid";
import SelectionSort from "~/server/selection";
import { useState } from "react";

export default function Home() {
  const textareastyle =
    "resize-none rounded-md bg-slate-950 p-0 py-2 text-center text-white";
  const hello = api.example.hello.useQuery({ text: "from Binary Search Tree" });
  const btn =
    "rounded-full bg-white px-10 py-3 font-semibold text-gray-800 no-underline transition hover:bg-purple-400";
  const heading =
    "text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]";

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    updateNodeValue(inserttextarea!)
  );
  removetextarea?.addEventListener("keyup", () =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    updateNodeValue(removetextarea!)
  );

  return (
    <>
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
              <Link href="/home">More!</Link>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <div>
                <div className="p-10"></div>
                <textarea
                  id="insertNodeValue"
                  className={textareastyle}
                  placeholder=""
                  title="node_value"
                >
                  {nodeValue}
                </textarea>
                <div className="p-5"></div>
                <button
                  className="rounded-full bg-white px-10 py-3 font-semibold text-gray-800 no-underline transition hover:bg-purple-400"
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  onClick={() => set(getTextAreaValue(inserttextarea!))}
                >
                  {insert}
                </button>
              </div>
              <div>
                <div className="p-10"></div>
                <textarea
                  id="removeNodeValue"
                  className={textareastyle}
                  placeholder=""
                  title="node_value"
                >
                  {nodeValue}
                </textarea>
                <div className="p-5"></div>
                <button
                  className="rounded-full bg-white px-10 py-3 font-semibold text-gray-800 no-underline transition hover:bg-purple-400"
                  onClick={() =>
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    void removeNode(getTextAreaValue(removetextarea!))
                  }
                >
                  {remove}
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-1 gap-4">
            <button className={btn} onClick={() => void searchTree("inorder")}>
              {print}
            </button>
            <button className={btn} onClick={() => void searchTree("preorder")}>
              {printpre}
            </button>
            <button
              className={btn}
              onClick={() => void searchTree("postorder")}
            >
              {printpost}
            </button>
          </div>
        </div>
        <div className="pt-10"></div>
        <div className={heading}>Selection Sort</div>
        <div className="pt-5"></div>
        <GridComponent />
        <div className="pt-10"></div>
        <div className="pt-10"></div>
      </main>
    </>
  );
}

const GridComponent = () => {
  //const unsortedArray = [5, 2, 10, 9, 6, 4, 1, 7] as number[];
  const [value, setValue] = useState([2, 1]);

  const handleAddButton = () => {
    const dd = document.getElementById(
      "selection-sort-array-value"
    ) as HTMLTextAreaElement;
    setValue([...value, parseInt(dd.value)]);
  };

  const handleSortButton = () => {
    SelectionSort(value);
    setValue([...value]);
  };

  return (
    <Grid
      values={value}
      handleSortButton={handleSortButton}
      handleAddButton={handleAddButton}
    />
  );
};

function removeNode(value: number) {
  const BSTree = getTree();
  console.log("node to remove", value);
  BSTree.delete(value);
  console.log(BSTree);
}

function searchTree(order: string) {
  const BSTree = getTree();
  const root = BSTree.traverse(BSTree.head, order);
  console.log(root);
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
      <p className="text-center text-2xl font-bold text-white">
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
