export const combineComponents = (...components: any[]) => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: any) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }: any) => <>{children}</>,
  );
};
