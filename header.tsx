// Copyright 2022-2023 the Deno authors. All rights reserved. MIT license.

import * as Icons from "./icons.tsx";
import { tw } from "twind";
import { css } from "twind/css";
import type { ComponentChildren, JSX } from "preact";

export interface HrefEntry {
  content: string;
  href: string;
  icon?: (props: { class?: string }) => JSX.Element;
}
export interface ChildrenEntry {
  content: string;
  children: HrefEntry[];
}

const defaultEntries: Array<HrefEntry | ChildrenEntry> = [
  {
    content: "模块",
    children: [
      { href: "/std", content: "标准库" },
      { href: "/x", content: "第三方模块" },
      { href: "/manual/node", content: "NPM" },
    ],
  },
  {
    content: "文档",
    children: [
      { href: "/manual", content: "手册" },
      { href: "/api", content: "API" },
    ],
  },
  { href: "https://deno.com/deploy", content: "部署" },
  {
    content: "社区",
    children: [
      {
        href: "https://discord.gg/deno",
        content: "Discord",
        icon: Icons.Discord,
      },
      {
        href: "https://github.com/denoland",
        content: "GitHub",
        icon: Icons.GitHub,
      },
      {
        href: "https://twitter.com/deno_land",
        content: "Twitter",
        icon: Icons.Twitter,
      },
      {
        href: "https://www.youtube.com/c/deno_land",
        content: "YouTube",
        icon: Icons.YouTube,
      },
      {
        href: "https://fosstodon.org/@deno_land",
        content: "Mastodon",
        icon: Icons.Mastodon,
      },
    ],
  },
];

export function Header({ manual, search, entriesOverwrite, afterEntries }: {
  manual?: boolean;
  search?: ComponentChildren;
  entriesOverwrite?: Array<HrefEntry | ChildrenEntry>;
  afterEntries?: Array<HrefEntry | ChildrenEntry>;
}) {
  return (
    <div class={`${manual ? "lg:border-b" : "border-b"} border-border`}>
      <div class="section-x-inset-2xl py-4.5 h-full">
        <nav class="flex justify-between flex-col lg:(flex-row gap-6) h-full">
          <input
            type="checkbox"
            id="menuToggle"
            class="hidden checked:siblings:flex checked:sibling:children:last-child:children:(first-child:hidden last-child:block)"
            autoComplete="off"
          />

          <div class="h-9 flex flex-1 items-center justify-between lg:justify-start select-none w-full lg:w-min gap-3 md:gap-6 lg:gap-8">
            <a
              href="/"
              class="flex items-center flex-none gap-4"
              aria-label="Landing Page"
            >
              <Icons.Logo class="h-10 flex-none" />
              <Icons.Deno class="h-6 flex-none" />
            </a>

            <label
              tabIndex={0}
              class={tw`cursor-pointer lg:hidden ${
                css({
                  "touch-action": "manipulation",
                })
              }`}
              for="menuToggle"
              // @ts-ignore onKeyDown does support strings
              onKeyDown="if (event.code === 'Space' || event.code === 'Enter') { this.click(); event.preventDefault(); }"
            >
              <Icons.Menu />
              <Icons.Cross class="hidden" />
            </label>
          </div>

          <div class="hidden flex-col mx-2 mt-5 gap-x-5 gap-y-4 font-medium lg:(flex flex-row items-center mx-0 mt-0)">
            <Entries entries={entriesOverwrite ?? defaultEntries} />
            {search}
            {afterEntries && <Entries entries={afterEntries} />}
          </div>
        </nav>
      </div>
    </div>
  );
}

function Entries({ entries }: { entries: Array<HrefEntry | ChildrenEntry> }) {
  return (
    <div class="leading-loose divide-incl-y lg:(space-x-3.5 flex-none select-none children:inline-block divide-incl-y-0)">
      {entries.map((entry) => {
        if ("children" in entry) {
          return (
            <div class="lg:(relative inline-block hover:children:(even:(shadow bg-azure3) last-child:block)) z-10">
              <input
                type="checkbox"
                id={entry.content}
                class="hidden checked:(siblings:last-child:block sibling:children:last-child:children:(odd:hidden even:block))"
                autoComplete="off"
              />

              <label
                htmlFor={entry.content}
                tabIndex={0}
                class="rounded-md flex items-center justify-between px-1 my-3 lg:(px-2 my-0 pointer-events-none)"
              >
                <span>{entry.content}</span>
                <div class="lg:hidden text-[#9CA0AA]">
                  <Icons.Plus />
                  <Icons.Minus class="hidden" />
                </div>
              </label>

              <div
                class={tw`hidden lg:(absolute -bottom-[20px] pt-[5px] w-full children:bg-azure3 ${
                  css({
                    filter: "drop-shadow(0px 1.5px 2px rgba(0, 0, 0, 0.3))",
                  })
                })`}
              >
                <div
                  class={tw`hidden lg:block w-full h-[15px] ${
                    css({
                      "clip-path":
                        "polygon(calc(50% - 15px * 2 / 3) 15px,50% 0,calc(50% + 15px * 2 / 3) 15px)",
                    })
                  }`}
                />
                <div class="pb-2 pl-2 mb-3 space-y-1.5 lg:(absolute pl-0 py-2 -mt-px mb-0 space-y-0 rounded-md overflow-hidden divide-y divide-white)">
                  {entry.children.map(({
                    href,
                    content,
                    icon,
                  }) => (
                    <div class="text-sm font-semibold lg:(top-1 text-base font-normal flex)">
                      <a
                        class="flex gap-2 items-center whitespace-nowrap py-1.5 pl-1 py-3 lg:(py-3.5 px-4) w-full leading-tight! hover:lg:bg-azure2"
                        href={href}
                      >
                        {icon?.({
                          class: "w-5! text-mainBlue flex-none",
                        })}
                        {content}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <a
                class="block w-full px-1 my-3 lg:(w-auto m-0 px-2 rounded-md hover:bg-azure3)"
                href={entry.href}
              >
                {entry.content}
              </a>
            </div>
          );
        }
      })}
    </div>
  );
}
