"use client";
import { useEffect, useState, useRef } from "react";
import SearchBar from "./components/search_bar";
import Tab from "./components/tab";
import Result from "./components/result";
import Loading from "./loading";
import Message from "./components/message";
import { Poppins } from "next/font/google";

const popins = Poppins({
  subsets: ["latin"],
  weight: "500",
});

export default function Home() {
  const controllerRef = useRef<AbortController | null>(null);
  const [langs, setLangs] = useState<any>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("in useEffect");

    const timeout = setTimeout(() => {
      const fetchData = async () => {
        try {
          if (!searchQuery && !selectedTag) {
            setLangs([]);
            return;
          }

          setError(null);
          setLoading(true);

          const queryParams = new URLSearchParams();
          queryParams.append("no-throttling", "true");

          if (controllerRef.current) {
            controllerRef.current.abort();
          }

          controllerRef.current = new AbortController();
          const signal = controllerRef.current.signal;

          if (searchQuery) queryParams.append("search", searchQuery);
          if (selectedTag) queryParams.append("tag", selectedTag);

          console.log("query", searchQuery);
          console.log("tag", selectedTag);
          console.log("hi", queryParams);

          const response = await fetch(
            `https://frontend-test-api.digitalcreative.cn/?${queryParams.toString()}`,
            { signal }
          );

          if (!response.ok) {
            setError(`HTTP error! Status: ${response.status}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const text = await response.text();
          const data = text ? JSON.parse(text) : [];

          setLangs(data);
        } catch (err: any) {
          if (err.name === "AbortError") {
            console.log("Fetch aborted, no need to update state.");
            return;
          }
          setError("Something went wrong. Please try again later.");
          setLangs([]);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, 1000);
    return () => {
      console.log("in return");
      clearTimeout(timeout);
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [searchQuery, selectedTag]);

  const handleTagSelect = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setSearchQuery("");
    } else {
      setSelectedTag(tag);
      setSearchQuery(tag);
    }
  };

  const handleSearchChange = (query: string | null) => {
    setSearchQuery(query);
    if (!query) {
      setSelectedTag(null);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#edf2f7]">
      <div className="flex-col">
        <div className="flex flex-col items-center sm:w-[690px] sm:h-[600px] w-[345px] h-[500px] p-[12px] sm:p-[24px] bg-white rounded-t-[20px] shadow-[4px_4px_10px_rgba(0,0,0,0.2)]">
          <div>
            <SearchBar
              selectedTag={selectedTag}
              onSearchChange={handleSearchChange}
              outline={error}
            />
          </div>
          {/* <p>{searchQuery}</p> */}
          <div className="my-[20px] sm:w-[642px] w-[321px] flex justify-start space-x-[16px] flex-wrap space-y-[16px] sm:space-y-0">
            <Tab
              tag_text={"Languages"}
              isSelected={selectedTag === "Languages"}
              onSelect={handleTagSelect}
            />
            <Tab
              tag_text={"Build"}
              isSelected={selectedTag === "Build"}
              onSelect={handleTagSelect}
            />
            <Tab
              tag_text={"Design"}
              isSelected={selectedTag === "Design"}
              onSelect={handleTagSelect}
            />
            <Tab
              tag_text={"Cloud"}
              isSelected={selectedTag === "Cloud"}
              onSelect={handleTagSelect}
            />
          </div>
          <div className="overflow-y-auto max-h-full w-full flex flex-col items-center">
            {/* {loading ? (
              <Loading />
            ) : error ? (
              <Message imageURL="/error.svg" />
            ) : langs && langs.length > 0 ? (
              langs.map((lang: any) => (
                <Result
                  key={lang.title}
                  title={lang.title}
                  description={lang.description}
                  image={lang.image}
                  url={lang.url}
                />
              ))
            ) : (
              <Message imageURL="/io.svg" />
            )} */}
            {loading && <Loading />}
            {!loading && error && <Message imageURL="/error.svg" />}
            {!loading && !error && !!langs ? (
              langs.map((lang: any) => (
                <Result
                  key={lang.title}
                  title={lang.title}
                  description={lang.description}
                  image={lang.image}
                  url={lang.url}
                />
              ))
            ) : (
              <Message imageURL="/io.svg" />
            )}
          </div>
        </div>

        <div className="sm:w-[690px] sm:h-[51px] w-[345px] h-[51px]  bg-white  rounded-b-[20px] shadow-[4px_4px_10px_rgba(0,0,0,0.2)]">
          <p
            className={`text-[#999FAA] text-[16px] w-[642px] ${popins.className} leading-[20px] pl-[24px] pt-[15px]`}
          >
            {loading ? (
              "Searching ..."
            ) : error ? (
              <span className="text-[#ed2e7e]">
                Something wrong happened but this is not your fault :)
              </span>
            ) : Array.isArray(langs) && langs.length > 0 ? (
              `${langs.length} results`
            ) : (
              "No results"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
