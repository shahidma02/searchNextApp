"use client";
import { useEffect, useState } from "react";
import SearchBar from "./components/search_bar";
import Tab from "./components/tab";
import Result from "./components/result";

export default function Home() {
  const [langs, setLangs] = useState<any>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!searchQuery && !selectedTag) {
          setLangs([]);
          return;
        }

        const queryParams = new URLSearchParams();
        queryParams.append("no-throttling", "true");

        if (searchQuery) queryParams.append("search", searchQuery);
        if (selectedTag) queryParams.append("tag", selectedTag);

        const response = await fetch(
          `https://frontend-test-api.digitalcreative.cn/?${queryParams.toString()}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : [];

        setLangs(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLangs([]);
      }
    };

    fetchData();
  }, [searchQuery, selectedTag]);

  const handleTagSelect = (tag: string) => {
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
    if (selectedTag !== null) {
      handleSearchChange(selectedTag);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex justify-center items-center h-screen m-0 bg-[#edf2f7]">
      <div className="flex-col">
        <div className="flex flex-col items-center w-[690px] h-[600px] bg-white border-[1rem] border-transparent rounded-t-[20px] shadow-[4px_4px_10px_rgba(0,0,0,0.2)] m-0">
          <div>
            <SearchBar
              selectedTag={selectedTag}
              onSearchChange={handleSearchChange}
            />
          </div>
          <p>{searchQuery}</p>
          <div className="mt-5 w-[642px] flex justify-start space-x-[16px] ">
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
            {langs && langs.length > 0 ? (
              langs.map((lang: any) => (
                <Result
                  key={lang.title}
                  title={lang.title}
                  description={lang.description}
                  image={lang.image}
                />
              ))
            ) : (
              <p>No results</p>
            )}
          </div>
        </div>

        <div className="w-[690px] h-[51px] bg-white border-[1rem] border-transparent rounded-b-[20px] shadow-[4px_4px_10px_rgba(0,0,0,0.2)] m-0 flex justify-center">
          <p className="text-[#999FAA] font-[500] text-[16px] w-[642px]">
            {langs && langs.length > 0
              ? `${langs.length} results`
              : "No results"}
          </p>
        </div>
      </div>
    </div>
  );
}
