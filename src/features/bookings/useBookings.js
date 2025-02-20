import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const page = Number(searchParams.get("page"));

  // QUERY
  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], //this part serves as a dependency array for the bookings array, so in here it means that is the filter changes then the data should be refetched from the api
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PREFETCHING
  // prefetch means fetching data before hand and it is used best in the case of pagination
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], //this part serves as a dependency array for the bookings array, so in here it means that is the filter changes then the data should be refetched from the api
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  return { bookings, error, isLoading, count };
}
