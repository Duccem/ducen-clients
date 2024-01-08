import { gql } from "@apollo/client";

export const CHOOSE_PLAN = gql`
  mutation choosePlan($guildId: String, $plan: String) {
    choosePlan(guildId: $guildId, plan: $plan)
  }
`;
