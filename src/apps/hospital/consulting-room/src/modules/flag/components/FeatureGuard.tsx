import { useFlagContext } from "../FlagContext";

export const FeatureGuard = ({ featureName, children }) => {
  const { flagState: { flags }} = useFlagContext();
  const feature = flags.find((feature) => feature.name.value === featureName);
  if (!feature || !feature.enabled) {
    return null;
  }
  return children;
};
