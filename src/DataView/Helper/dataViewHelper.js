export const freeze = (dependcies) => {
  let freeze = false;

  dependcies.forEach((el) => {
    freeze = freeze || el;
  });

  return freeze;
};

export function mergeCSS(args) {
  return args.reduce((className, el) => (className += " " + el));
}
