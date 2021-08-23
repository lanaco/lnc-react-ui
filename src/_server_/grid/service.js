var db = [
  {
    id: 1,
    name: "Mariel Dockree",
    age: 22,
    subordinates: [
      { id: 1, name: "Aluin Elsey" },
      { id: 2, name: "Lyssa Baldry" },
      { id: 3, name: "Rory Seywood" },
      { id: 4, name: "Aluin Elsey" },
      { id: 5, name: "Lyssa Baldry" },
      { id: 6, name: "Rory Seywood" },
      { id: 7, name: "Aluin Elsey" },
      { id: 8, name: "Lyssa Baldry" },
      { id: 9, name: "Rory Seywood" },
      { id: 10, name: "Aluin Elsey" },
      { id: 11, name: "Lyssa Baldry" },
      { id: 12, name: "Rory Seywood" },
      { id: 13, name: "Aluin Elsey" },
      { id: 14, name: "Lyssa Baldry" },
      { id: 15, name: "Rory Seywood" },
      { id: 16, name: "Aluin Elsey" },
      { id: 17, name: "Lyssa Baldry" },
      { id: 18, name: "Rory Seywood" },
      { id: 19, name: "Lyssa Baldry" },
      { id: 20, name: "Rory Seywood" },
      { id: 21, name: "Aluin Elsey" },
      { id: 22, name: "Lyssa Baldry" },
      { id: 23, name: "Rory Seywood" },
    ],
  },
  {
    id: 2,
    name: "Kristo Comsty",
    age: 68,
    subordinates: [],
  },
  {
    id: 3,
    name: "Yank Curnokk",
    age: 31,
    subordinates: [],
  },
  { id: 4, name: "Yves Harland", age: 47, subordinates: [] },
  { id: 5, name: "Alaster Bonds", age: 48, subordinates: [] },
  { id: 6, name: "Diena Honeyghan", age: 62, subordinates: [] },
  { id: 7, name: "Chev Wiffler", age: 54, subordinates: [] },
  { id: 8, name: "Blair Baldry", age: 19, subordinates: [] },
  { id: 9, name: "Bess Geffe", age: 36, subordinates: [] },
  { id: 10, name: "Aluin Sartain", age: 38, subordinates: [] },
  { id: 11, name: "Mollee Bennedick", age: 69, subordinates: [] },
  { id: 12, name: "Corabel Raspison", age: 35, subordinates: [] },
  { id: 13, name: "Alverta Lars", age: 41, subordinates: [] },
  { id: 14, name: "Debor Jannex", age: 59, subordinates: [] },
  { id: 15, name: "Brianne Raymond", age: 17, subordinates: [] },
  { id: 16, name: "Giacinta Moxley", age: 34, subordinates: [] },
  { id: 17, name: "Lyssa Jonah", age: 47, subordinates: [] },
  { id: 18, name: "Jessee Lowbridge", age: 66, subordinates: [] },
  { id: 19, name: "Nobe Annott", age: 22, subordinates: [] },
  { id: 20, name: "Janey Elsey", age: 58, subordinates: [] },
  { id: 21, name: "Melantha Yashin", age: 60, subordinates: [] },
  { id: 22, name: "Finn Lilywhite", age: 30, subordinates: [] },
  { id: 23, name: "Shermie Yukhnev", age: 33, subordinates: [] },
  { id: 24, name: "Douglass Bluett", age: 27, subordinates: [] },
  { id: 25, name: "Kiersten Praten", age: 38, subordinates: [] },
  { id: 26, name: "Robinet Wiffler", age: 69, subordinates: [] },
  { id: 27, name: "Cosette Quemby", age: 50, subordinates: [] },
  { id: 28, name: "Delora Tejada", age: 63, subordinates: [] },
  { id: 29, name: "Coriss Edgerly", age: 68, subordinates: [] },
  { id: 30, name: "Burr Shanklin", age: 64, subordinates: [] },
  { id: 31, name: "Rory Dealy", age: 70, subordinates: [] },
  { id: 32, name: "Zabrina Lettley", age: 52, subordinates: [] },
  { id: 33, name: "Lucita Lartice", age: 65, subordinates: [] },
  { id: 34, name: "Conrade Seywood", age: 61, subordinates: [] },
  { id: 35, name: "Tildi Nerne", age: 17, subordinates: [] },
  { id: 36, name: "Kassie Arrowsmith", age: 58, subordinates: [] },
  { id: 37, name: "Burr Bimson", age: 29, subordinates: [] },
  { id: 38, name: "Liam Aldine", age: 31, subordinates: [] },
  { id: 39, name: "Hewett Reynolds", age: 60, subordinates: [] },
  { id: 40, name: "Angelina Tilne", age: 40, subordinates: [] },
  { id: 41, name: "Jordanna Strotone", age: 17, subordinates: [] },
  { id: 42, name: "Chrystal Lawfull", age: 26, subordinates: [] },
  { id: 43, name: "Gena Vasilchenko", age: 66, subordinates: [] },
  { id: 44, name: "Bethena Hudspeth", age: 39, subordinates: [] },
  { id: 45, name: "Cosetta Muzzini", age: 58, subordinates: [] },
  { id: 46, name: "Chaunce Levermore", age: 16, subordinates: [] },
  { id: 47, name: "Fred Slyme", age: 33, subordinates: [] },
  { id: 48, name: "Valentine Whittaker", age: 32, subordinates: [] },
  { id: 49, name: "Bryce Caneo", age: 67, subordinates: [] },
  { id: 50, name: "Kerry Byrd", age: 46, subordinates: [] },
  { id: 51, name: "Midge Fidelli", age: 43, subordinates: [] },
];

//====================================================================================

const loadData = (data = {}) => {
  var { PageSize = 10, CurrentPage = 1 } = data;
  // const { Ordering = {} } = data;
  // const { Accessor = "", Ascending = false, Descending = false } = Ordering;

  var pageCount = Math.ceil(db.length / PageSize);
  if (CurrentPage > pageCount || CurrentPage < 1) CurrentPage = 1;

  var offset = (CurrentPage - 1) * PageSize;
  data = db.slice(offset, offset + PageSize);

  return {
    isSuccessfull: true,
    errors: [],
    Data: data,
    CurrentPage: CurrentPage,
    PageCount: pageCount,
    PageSize: PageSize,
    DataCount: db.length,
    LoadedDataCount: data.length,
  };
};

const editableEdit = (data) => {
  if (Math.floor(Math.random() * 10) > 1) {
    var item = db.find((x) => x.id === data.id);
    var index = db.indexOf(item);
    db[index] = data;

    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve({
          isSuccessfull: true,
          errors: [],
          Data: data,
        });
      }, 650);
    });
  } else {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve({
          isSuccessfull: false,
          errors: [],
          Data: data,
        });
      }, 650);
    });
  }
};

const editableAdd = (data) => {
  if (Math.floor(Math.random() * 10) > 1) {
    db.push(data);

    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve({
          isSuccessfull: true,
          errors: [],
          Data: data,
        });
      }, 550);
    });
  } else {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve({
          isSuccessfull: false,
          errors: [],
          Data: data,
        });
      }, 550);
    });
  }
};

export default {
  loadData,
  editableEdit,
  editableAdd,
};
