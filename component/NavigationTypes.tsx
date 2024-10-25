// import Data from "./Data";
// import Registration from "./Registration";


export type NavigationTypes = {
  Registration: undefined; // No parameters for DataForm
  Data: { name: string; email: string; password: string }; // Parameters for DataDisplay
};