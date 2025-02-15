import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabin() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  }); //the useQuery is used when we have to or want to fetch the data from the api, and it gives us access to the isLoading state, and also the potential error

  return { isLoading, cabins };
}
