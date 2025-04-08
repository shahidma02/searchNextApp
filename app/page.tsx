"use client";
import { useEffect, useState, useCallback } from "react";
import { SearchBar } from "./components/search_bar";
import { Tab } from "./components/tab";
import { Result } from "./components/result";
import Loading from "./loading";
import { Message } from "./components/message";
import { Poppins } from "next/font/google";
import Link from "next/link";

const popins = Poppins({
  subsets: ["latin"],
  weight: "500",
});

type ResultState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; data: any[] };

const tabs = ["Languages", "Build", "Design", "Cloud"];

export default function Home() {
  const [results, setResults] = useState<ResultState>({
    status: "success",
    data: [],
  });
  const [searchQuery, setSearchQuery] = useState<string | null>("");

  const fetchData = async (signal: AbortSignal) => {
    try {
      if (!searchQuery) {
        setResults({ status: "success", data: [] });
        return;
      }

      setResults({ status: "loading" });

      const queryParams = new URLSearchParams();
      queryParams.append("no-throttling", "true");

      if (searchQuery) queryParams.append("search", searchQuery);

      const response = await fetch(
        `https://frontend-test-api.digitalcreative.cn/?${queryParams.toString()}`,
        { signal }
      );

      if (!response.ok) {
        setResults({ status: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : [];

      setResults({ status: "success", data });
    } catch (err: any) {
      if (err.name === "AbortError") {
        setResults({ status: "error" });
        console.log("Fetch aborted, no need to update state.");
        return;
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    console.log("in useEffect");

    const timeout = setTimeout(() => {
      fetchData(signal);
    }, 1000);
    return () => {
      console.log("in return");
      clearTimeout(timeout);
      controller.abort();
    };
  }, [searchQuery]);

  const handleTagSelect = useCallback(
    (tag: string) => {
      if (searchQuery === tag) {
        setSearchQuery("");
      } else {
        setSearchQuery(tag);
      }
    },
    [searchQuery]
  );

  const handleSearchChange = useCallback(
    (query: string | null) => {
      setSearchQuery(query);
      if (!query) {
        setSearchQuery(null);
      }
    },
    [searchQuery]
  );

  return (
    <div className="flex justify-center items-center h-screen bg-[var(--color-background)]">
      <Link href="/form">
        <p>Form</p>
      </Link>
      <div className="flex-col">
        <div className="flex flex-col items-center sm:w-[690px] sm:h-[600px] w-[345px] h-[500px] p-[12px] sm:p-[24px] bg-white rounded-t-[20px] shadow-[4px_4px_10px_rgba(0,0,0,0.2)]">
          <div>
            <SearchBar
              selectedTag={searchQuery}
              onSearchChange={handleSearchChange}
              outline={results.status === "error"}
            />
          </div>
          <div className="my-[20px] sm:w-[642px] w-[321px] flex justify-start space-x-[16px] flex-wrap space-y-[16px] sm:space-y-0">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                tag_text={tab}
                isSelected={searchQuery === tab}
                onSelect={handleTagSelect}
              />
            ))}
          </div>
          <div className="overflow-y-auto max-h-full w-full flex flex-col items-center">
            {results.status === "loading" && <Loading />}
            {results.status === "error" && <Message imageURL="/error.svg" />}
            {results.status === "success" && !results.data.length && (
              <Message imageURL="/io.svg" />
            )}
            {results.status === "success" &&
              results.data.length > 0 &&
              results.data.map((lang: any) => (
                <Result
                  key={lang.title}
                  title={lang.title}
                  description={lang.description}
                  image={lang.image}
                  url={lang.url}
                />
              ))}
          </div>
        </div>

        <div className="sm:w-[690px] sm:h-[51px] w-[345px] h-[51px]  bg-white  rounded-b-[20px] shadow-[4px_4px_10px_rgba(0,0,0,0.2)]">
          <p
            className={`text-[var(--color-grey)] text-[16px] w-[642px] ${popins.className} leading-[20px] pl-[24px] pt-[15px]`}
          >
            {results.status === "loading" && "Searching..."}
            {results.status === "error" && (
              <span className="text-[var(--color-error)]">
                Something wrong happened but this is not your fault :)
              </span>
            )}
            {results.status === "success" &&
              !results.data.length &&
              "No Results"}
            {results.status === "success" &&
              results.data.length > 0 &&
              `${results.data.length} results`}
          </p>
        </div>
      </div>
    </div>
  );
}
