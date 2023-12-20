import { Metadata } from 'next';
import { searchNotesTotalPage } from '@/api/note';
import Title from '@/components/Title';
import Main from '@/components/Main';
import Search from '@/components/Search';
import SearchResult from '@/components/SearchResult';
import Pagination from '@/components/Pagination';
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { Suspense } from 'react';
export const metadata: Metadata = {
  title: 'Search',
};

type PageProps = {
  searchParams?: {
    query?: string;
    page?: string;
  }
}

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await searchNotesTotalPage(query);
  return <Main>
    <div className="mb-5">
      <Title>Search</Title>
    </div>

    <div className="mb-5">
      <Search placeholder="Search notes..." />
    </div>
    <Suspense key={query + currentPage} fallback={<SearchLoading />}>
      <SearchResult query={query} currentPage={currentPage} />
    </Suspense>
    <div className="mt-3 flex w-full justify-center">
      <Pagination totalPages={totalPages} />
    </div>
  </Main>
}

function SearchLoading() {
  return <div className="w-full flex justify-center items-center text-gray-100">
    <span className='mr-2'><CgSpinnerTwoAlt className="animate-spin" /></span> <span>Searching...</span>
  </div>
}