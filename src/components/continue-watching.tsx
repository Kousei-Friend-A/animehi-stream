"use client"

import SwiperContinueWatching from "./swiper-continue-watching"
import Section from "./section"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "./ui/skeleton"

export default function ContinueWatching() {
  const { data, isLoading } = useQuery({
    queryKey: ["watching"],
    queryFn: () => fetch(`/api/user/watching`).then((res) => res.json()),
  })

  return (
    <Section sectionName="recently-watch" className="relative">
      <h3 className="flex w-full pt-2.5 text-left text-2xl font-semibold">
        <div className="mr-2 h-8 w-2 rounded-md bg-primary"></div>
        Recently Watched
      </h3>
      <span className="pb-6 text-xs text-muted-foreground/70">
        Swipe for more
      </span>
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Skeleton className="h-44 w-full md:w-80"></Skeleton>
          <Skeleton className="hidden h-44 w-80 md:block"></Skeleton>
          <Skeleton className="hidden h-44 w-80 md:block"></Skeleton>
          <Skeleton className="hidden h-44 w-80 md:block"></Skeleton>
        </div>
      ) : (
        <SwiperContinueWatching results={data} />
      )}
    </Section>
  )
}
