import { Button } from "@/components/ui/button";
import { CancelGroupButton } from "@/components/core/button/CancelGroupButton";
import { Input } from "@/components/ui/input";
import { useTimesheetTableContext } from "./TimesheetTable.context";
import { formatDate } from "./utility";
import { Controller } from "react-hook-form";
import { useCreateTimesheet, useUpdateTimesheet } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

export function TimesheetTableToolbar() {
  const [
    {
      isReadOnly,
      isCreateMode,
      timesheetQuery,
      timesheetId,
      form: {
        control,
        register,
        getValues,
        formState: { isValid, errors },
      },
    },
    { setIsReadOnly },
  ] = useTimesheetTableContext();
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["timesheet", "list"] });

  const createMutation = useCreateTimesheet({
    invalidate,
  });

  const updateMutation = useUpdateTimesheet({
    timesheetId,
    invalidate,
  });

  const setIsExposed = (value: boolean) => {
    if (value) {
      setIsReadOnly(false);
    } else {
      setIsReadOnly(true);
    }
  };
  const values = getValues();
  const isLoading = timesheetQuery.isLoading;

  const onSubmit = () => {
    const formValues = getValues();

    const data = {
      ...formValues,
      date: formValues.date as Date,
    };

    if (isCreateMode) {
      return createMutation.mutate(data);
    }

    return updateMutation.mutate(data);
  };

  return (
    <div className="flex justify-between items-center p-2 border-b gap-2">
      <div className="flex gap-2">
        {isCreateMode || !isReadOnly ? (
          <>
            <div className="flex flex-col min-w-[196px]">
              <Input
                placeholder="Timesheet Name"
                className=""
                {...register("name")}
              />
              {!!errors.name?.message && (
                <p className="text-destructive text-xs">
                  {errors.name!.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Controller
                control={control}
                name="date"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      type="date"
                      value={
                        (field.value as Date)?.toISOString?.().split?.("T")?.[0]
                      }
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      //disabled={!isCreateMode}
                    />
                    {!!fieldState.error?.message && (
                      <p className="text-destructive text-xs">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </>
        ) : (
          <>
            {!!values && !!values.name && (
              <em className="not-italic inline-flex gap-x-1">
                <span>{values.name}</span>
                <span>-</span>
                {!!values.date && (
                  <strong className="font-semibold text-gray-500">
                    {formatDate(values.date as Date)}
                  </strong>
                )}
              </em>
            )}
          </>
        )}
      </div>
      {isCreateMode ? (
        <Button disabled={!isValid || isLoading} onClick={onSubmit}>
          Create
        </Button>
      ) : (
        <CancelGroupButton
          isBusy={isLoading}
          initButton={{ buttonText: "Edit" }}
          isExposed={!isReadOnly}
          setIsExposed={setIsExposed}
        >
          <Button disabled={!isValid} onClick={onSubmit}>
            Save
          </Button>
        </CancelGroupButton>
      )}
    </div>
  );
}
