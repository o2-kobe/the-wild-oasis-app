import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams(); //in this case, since the bookingId is the dynamic part of the route, then we use the useParams hook and then from it we destructiure the results

  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    // retry: false,
  });

  return { isLoading, booking };
}
