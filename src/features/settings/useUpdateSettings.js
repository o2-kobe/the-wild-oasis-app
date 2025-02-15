import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      // reset(); //this is a funciton given to us by the react-hook-form and it used to empty all the fields within the form
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateSetting, isUpdating };
}
