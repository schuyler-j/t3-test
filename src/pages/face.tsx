import React from "react";
import { api } from "~/utils/api";
import { useState } from "react";
import Footer from "~/components/footer";
import html2canvas from "html2canvas";
import Image from "next/image";

const Face = () => {
  const [b64png, setSvg] = useState("");
  const [png, setUrlDownload] = useState("");
  const d = api.facegen.generateFace.useQuery();

  React.useEffect(() => {
    if (d.data) {
      const svg = d.data;
      setSvg(svg);
      void (async () => {
        try {
          const svgContain = document.createElement("div");
          svgContain.style.width = "120px";
          svgContain.style.height = "120px";
          const tempData = svg.replace(/^data:image\/svg\+xml;base64,/, "");
          svgContain.innerHTML = Buffer.from(tempData, "base64").toString(
            "utf-8"
          );
          document.body.appendChild(svgContain);
          const canvas = await html2canvas(svgContain);
          console.log(canvas);
          const pngUrl = canvas.toDataURL("image/png");
          console.log("Canvas dimensions:", canvas.width, canvas.height);
          console.log(pngUrl);
          setUrlDownload(pngUrl);
          document.body.removeChild(svgContain);
        } catch (error) {
          console.log(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d.data]);

  const refresh = () => {
    window.location.reload();
  };

  const download = () => {
    if (png) {
      const a = document.createElement("a");
      a.href = png;
      console.log(png);
      a.download = "super_cool_svg_generated_profile.png";
      a.click();
    }
  };

  const imageLoad = {
    key1: () => (
      <Image
        id="pfp"
        className=""
        src={b64png}
        alt="Base64 SVG/PNG profile picture"
        width={120}
        height={120}
      ></Image>
    ),
    key2: () => (
      <div className="m-10 h-10 w-12 text-justify text-[1rem] text-white">
        Loading profile pic...
      </div>
    ),
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#252525] to-[#000000] text-center">
      <div className="rounded-lg  bg-lime-900 p-20">
        <div className="text-[4rem] font-bold tracking-tight text-lime-100">
          Face <span className="text-lime-400">Me!</span>
          <div className="m-10 text-[1rem] font-normal tracking-wide">
            here&apos;s a cool new discord pfp for you...
          </div>
          <div className="">
            <div className="h-20 rounded-t-2xl bg-lime-300"></div>
            <div className="absolute">
              <button
                onClick={refresh}
                className="relative -right-52 -top-16 rounded-sm bg-green-600 px-4 py-1 text-[1rem] font-semibold duration-500 hover:bg-green-800"
              >
                Refresh Page
              </button>
              <button
                onClick={download}
                className="relative bottom-16 -ml-28 overflow-hidden rounded-full border-8 border-zinc-800 text-transparent duration-300 hover:text-white hover:grayscale hover:filter"
              >
                <span className="absolute right-[25px] top-12 text-[1rem]">
                  save png
                </span>
                {b64png ? (
                  <Image
                    id="pfp"
                    className=""
                    src={b64png}
                    alt="Base64 SVG/PNG profile picture"
                    width={120}
                    height={120}
                  ></Image>
                ) : (
                  <div className="m-10 h-10 w-12 text-justify text-[1rem] text-white">
                    Loading profile pic...
                  </div>
                )}
              </button>
              <div className="relative -top-28 left-[114px] h-6 w-6 rounded-full border-4 border-zinc-900 bg-green-500"></div>
            </div>
            <div className="h-60 rounded-b-2xl bg-zinc-800 text-zinc-800">
              Secret
              <div className="mx-4 h-32 rounded-lg bg-zinc-900">
                <div className="mx-6 py-4 text-left text-[1rem] font-semibold tracking-normal text-white">
                  Click pfp to download...
                </div>
                <div className="mx-6 grid grid-flow-col gap-8 border-b-[1px] border-gray-400">
                  <div className="border-b-2 border-white pb-4 text-left text-[0.90rem] font-medium tracking-normal text-white">
                    User Info
                  </div>
                  <div className="text-left text-[0.90rem] font-medium tracking-normal text-gray-400">
                    Mutual Servers
                  </div>
                  <div className="text-left text-[0.90rem] font-medium tracking-normal text-gray-400">
                    Mutual Friends
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Face;
