import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { useContext } from "react";
import { Countdown } from "./Countdown";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { NewCycleForm } from "./NewCycleForm";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z.number().min(1).max(60),
});

type NewCycleFormData = z.infer<typeof newCycleFormSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch("task");

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={!task} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
