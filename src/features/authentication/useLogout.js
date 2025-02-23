import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(); // we have to remove the queries so that the user's data will be taken of the cache and the local server
      navigate("/login", { replace: true }); //with replace set to true, the user cannot use the back button to go back to the page prior to that we are navigating to.
    },
  });

  return { logout, isLoading };
}
