import { useEffect, useState } from "react";
import { SearchResult } from "../../models/SearchResult";
import { fetchSearchResults } from "../../services/database";

export default function useSearchResults() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let isCancelled = false;
    async function fetch() {
      const results = await fetchSearchResults(searchText);
      if (isCancelled) return;
      setResults(results);
      setIsFetchingResults(false);
    }

    setIsFetchingResults(true);
    fetch();

    return () => {
      isCancelled = true;
    };
  }, [searchText]);

  function appendSearchText(text: string) {
    if (searchText.trim().length === 0) {
      setSearchText(text);
      return;
    }
    setSearchText(searchText.trim() + " " + text);
  }

  return {
    results,
    isFetchingResults,
    searchText,
    setSearchText,
    appendSearchText,
  };
}
