import { useEffect, useState } from "react";
import { SearchResult } from "../../models/SearchResult";
import { fetchSearchResults } from "../../services/database";
import { SearchResultType } from "../../models/SearchResultType";

export default function useSearchResults() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResultType, setSearchResultType] = useState(SearchResultType.Everything);

  useEffect(() => {
    let isCancelled = false;
    async function fetch() {
      const results = await fetchSearchResults(searchText, searchResultType);
      if (isCancelled) return;
      setResults(results);
      setIsFetchingResults(false);
    }

    setIsFetchingResults(true);
    fetch();

    return () => {
      isCancelled = true;
    };
  }, [searchText, searchResultType]);

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
    searchResultType,
    setSearchResultType,
  };
}
