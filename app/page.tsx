"use client";
import { useEffect, useState } from "react";
import SearchBar from "./components/search_bar";
import Tab from "./components/tab";
import Result from "./components/result";
import Loading from "./loading";
import Message from "./components/message";

export default function Home() {
  const [langs, setLangs] = useState<any>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("in useEffect");
    setLangs([]);
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

        if (searchQuery) queryParams.append("search", searchQuery);
        if (selectedTag) queryParams.append("tag", selectedTag);
        console.log("query", searchQuery);
        console.log("tag", selectedTag);
        console.log("hi", queryParams);
        const response = await fetch(
          `https://frontend-test-api.digitalcreative.cn/?${queryParams.toString()}`
        );

        if (!response.ok) {
          // console.error("HTTP error! status: ", response.status);
          setError(`HTTP error! Status: ${response.status}`);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : [];

        setLangs(data);
      } catch (err: any) {
        if (err.name === "AbortError") {
          setError("Request timed out. Please try again.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
        setLangs([]);
        // console.error("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
  };

  return (
    <div className="flex justify-center items-center h-screen m-0 bg-[#edf2f7]">
      <div className="flex-col">
        <div className="flex flex-col items-center sm:w-[690px] sm:h-[600px] w-[345px] h-[500px]  bg-white border-[1rem] border-transparent rounded-t-[20px] shadow-[4px_4px_10px_rgba(0,0,0,0.2)] m-0">
          <div>
            <SearchBar
              selectedTag={selectedTag}
              onSearchChange={handleSearchChange}
              outline={error}
            />
          </div>
          {/* <p>{searchQuery}</p> */}
          <div className="mt-5 sm:w-[642px] w-[321px] flex justify-start space-x-[16px] space-y-[10px] flex-wrap">
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
          <div className="overflow-y-auto max-h-full w-full">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message imageURL="/error.jpg" />
            ) : langs && langs.length > 0 ? (
              langs.map((lang: any) => (
                <Result
                  key={lang.title}
                  title={lang.title}
                  description={lang.description}
                  image={lang.image}
                />
              ))
            ) : (
              <Message imageURL="/no_result.jpg" />
            )}
          </div>
        </div>

        <div className="sm:w-[690px] sm:h-[51px] w-[345px] h[51px]  bg-white border-[1rem] border-transparent rounded-b-[20px] shadow-[4px_4px_10px_rgba(0,0,0,0.2)] m-0 flex justify-center">
          <p className="text-[#999FAA] font-[500] text-[16px] w-[642px]">
            {langs && langs.length > 0 ? (
              `${langs.length} results`
            ) : loading ? (
              "Searching ..."
            ) : error ? (
              <span className="text-[#ed2e7e]">
                Something wrong happened but this is not your fault :)
              </span>
            ) : (
              "No results"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
