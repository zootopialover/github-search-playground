import React, { useEffect, useState } from "react";
import { GitHubRepository } from "./models";
import { NoDataFound, ListRepositories, SearchForm } from "./components";
import { getCachedResult, cacheResult, searchPublicRepositories } from "./api";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<Array<GitHubRepository>>([]);
  const [searchKey, setSearchKey] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const fetchFromAPI = async (searchParams: { query: string, offset: number, count: number, sortKey: string, page: number, order: string }) => {
    setIsLoading(true);

    try {
      const results = await searchPublicRepositories(searchParams);
      if (results.status === 200 && results.data.incomplete_results === false) {
        const resultItems = results.data.items;
        const cacheKey = `gs-${searchParams.query.replace(/\s\s+/g, "-")}-${searchParams.sortKey}-${searchParams.order}-${searchParams.page}`;
        cacheResult(cacheKey, resultItems, 1 * 60);
        setRepositories(resultItems);
        setTotalCount(results.data.total_count);
      }
    } catch (error) {
    }

    setIsLoading(false);
  }

  const fetchData = (param: { page: number }, sort: any) => {
    if (isLoading) return;

    const searchParams: any = { query: searchKey, offset: repositories?.length * (param.page), count: 20, page: param.page + 1 };
    if(sort) {
      searchParams.sortKey = sort.field ? sort.field : 'name';
      searchParams.order = sort.sort ? sort.sort : 'asc';
    }
    const cacheKey = `gs-${searchParams.query.replace(/\s\s+/g, "-")}-${searchParams.sortKey}-${searchParams.order}-${searchParams.page}`;
    const cachedResults = getCachedResult(cacheKey);
    if (cachedResults.length > 0) {
      setRepositories(cachedResults);
      return;
    }

    fetchFromAPI(searchParams);
  }

  useEffect(()=> {
    fetchData({page: 1}, undefined); 
  }, [searchKey]);

  return (
    <div>
      <SearchForm searchFn={(key: string) => setSearchKey(key)} />
      {repositories.length > 0 ?
        <ListRepositories repositories={repositories} total={totalCount} fetchData={fetchData} />
        : <NoDataFound />
      }
    </div>
  );
}

export default App;
