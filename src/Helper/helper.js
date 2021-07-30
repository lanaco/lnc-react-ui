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

export const getGuid = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};
