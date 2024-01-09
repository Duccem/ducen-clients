import { addDays, subDays } from "date-fns";
import uuid from "react-native-uuid";
import { CreateDream } from "../../../modules/Dream/application/CreateDream/CreateDream";
import { GetDreams } from "../../../modules/Dream/application/GetDreams/GetDreams";
import { DreamStoreActions } from "./DreamState";
import { useDatabaseConnection } from "../../shared/state/DatabaseContext";

export function useDreamServices({}: DreamStoreActions) {
  const { dreamRepository } = useDatabaseConnection();
  return {
    createDream: async () => {
      console.log(dreamRepository);
      await dreamRepository.createTable();
      const creator = new CreateDream(dreamRepository);
      const id = uuid.v4().toString();
      creator.run(id, new Date(), new Date(), addDays(new Date(), 8), 8, 9, 6, "awake");
    },
    getDreams: async () => {
      const getter = new GetDreams(dreamRepository);
      const dreams = await getter.run(subDays(new Date(), 1), addDays(new Date(), 1));
      return dreams;
    },
  };
}

export type DreamServices = ReturnType<typeof useDreamServices>;
