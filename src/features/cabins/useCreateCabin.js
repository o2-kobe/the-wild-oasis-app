import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      // reset(); //this is a funciton given to us by the react-hook-form and it used to empty all the fields within the form
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createCabin, isCreating };
}
