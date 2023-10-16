import type {
  AnimeInfoResponse,
  ConsumetResponse,
  Popular,
  RecentEpisode,
  Search,
  SourcesResponse,
} from "types/types"

// import { ISearch,  } from "@consumet/extensions/dist/models/types"

export const url = "https://api.consumet.org/anime/gogoanime"

export const publicUrl = process.env.NEXT_PUBLIC_APP_URL

export async function recent() {
  const response = await fetch(`${publicUrl}/api/anime/recents`, {
    cache: "no-cache",
  })

  if (!response.ok) throw new Error("Failed to fetch recent episodes.")

  return (await response.json()) as ConsumetResponse<RecentEpisode>
}

export async function popular() {
  const response = await fetch(`${publicUrl}/api/anime/trending`)

  if (!response.ok) throw new Error("Failed to fetch top airing")

  return (await response.json()) as ConsumetResponse<Popular>
}

export async function animeInfo(animeId: string) {
  const response = await fetch(`${publicUrl}/api/anime/info/${animeId}`, {
    next: { revalidate: 5 * 60 },
  })

  if (!response.ok) throw new Error("Failed to fetch anime informations")

  return (await response.json()) as AnimeInfoResponse
}

export async function watch(episodeId: string) {
  const response = await fetch(`${publicUrl}/api/watch/${episodeId}`, {
    cache: "no-cache",
  })

  if (!response.ok) throw new Error("Failed to fetch anime informations")

  return (await response.json()) as SourcesResponse
}

export async function search({
  query,
  page = 1,
}: {
  query: string
  page?: number
}) {
  const response = await fetch(`${url}/${query}?page=${page}`)

  if (!response.ok) throw new Error("Failed to fetch search.")

  return (await response.json()) as ConsumetResponse<Search>
}