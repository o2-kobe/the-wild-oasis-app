import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      // reset(); //this is a funciton given to us by the react-hook-form and it used to empty all the fields within the form
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editCabin, isEditing };
}
