import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, InfiniteHits } from "react-instantsearch-dom";

import SEO from "../components/SEO";
import Header from "../components/Header";
import SearchFilters from "../components/SearchFilters";
import SearchSummary from "../components/SearchSummary";
import Hit from "../components/Hit";
import SubmitForm from "../components/SubmitForm";
import { useLayoutState } from "../context/LayoutContext";

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
);

export default function IndexPage() {
  const { layout } = useLayoutState();
  // const [searchState, saveSearchState] = useLocalStorage(
  //   "search-filter-state",
  //   JSON.stringify({})
  // );

  // const setAlgoliaSearchState = (state) =>
  //   saveSearchState(JSON.stringify(state));

  return (
    <React.Fragment>
      <SEO />
      <Header
        title="Headless Commerce Resources"
        description="A community curated list of commerce products, services, podcasts, books, and more. A heads-up for modern store builders."
        ctas={[{ to: "/about", children: "Learn more" }]}
      />

      <InstantSearch
        searchClient={client}
        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
        // searchState={JSON.parse(searchState)}
        // onSearchStateChange={setAlgoliaSearchState}
      >
        <div className="max-w-5xl px-6 md:px-6 mx-auto py-0">
          <div className="flex flex-wrap -mx-6">
            <aside className="w-full md:w-1/4 px-6 md:pr-0">
              <SearchFilters />
            </aside>

            <div className="w-full md:w-3/4 px-6 -mt-6 md:-mt-16">
              <div className="bg-white rounded overflow-hidden shadow mb-4">
                <SearchSummary />
                <InfiniteHits className={layout} hitComponent={Hit} />
              </div>

              <SubmitForm />
            </div>
          </div>
        </div>
      </InstantSearch>
    </React.Fragment>
  );
}
