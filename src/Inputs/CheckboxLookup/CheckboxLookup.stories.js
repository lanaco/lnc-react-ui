import React from "react";
import CheckboxLookup from "./index";
import theme from "../../_utils/theme";

export default {
  title: "Inputs/Checkbox Lookup",
  component: CheckboxLookup,
  argTypes: {},
};

const Template = (args) => {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const onChange = (_, selectedItems) => {
    setSelectedOptions(selectedItems);
  };

  const onSelectDeselectAll = (val) => {
    if (val) setSelectedOptions(args.options);
    if (!val) setSelectedOptions([]);
  };

  return (
    <div>
      <CheckboxLookup
        {...args}
        selectedOptions={selectedOptions}
        onChange={onChange}
        onSelectDeselectAll={onSelectDeselectAll}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: "id",
  theme: theme,
  color: "primary",
  onChange: () => {},
  size: "small",
  disabled: false,
  itemId: "id",
  itemText: "code",
  style: "toggle",
  title: "Title",
  pagination: true,
  height: "150px",
  options: [
    {
      id: 0,
      code: "Misty Lewis",
    },
    {
      id: 1,
      code: "Wells Lyons",
    },
    {
      id: 2,
      code: "Fuller Golden",
    },
    {
      id: 3,
      code: "Shelia Cole",
    },
    {
      id: 4,
      code: "Hewitt Duke",
    },
    {
      id: 5,
      code: "Sonja Mcbride",
    },
    {
      id: 6,
      code: "Queen Coleman",
    },
    {
      id: 7,
      code: "Dominique Ellison",
    },
    {
      id: 8,
      code: "Sanchez Bradley",
    },
    {
      id: 9,
      code: "Simpson Ochoa",
    },
    {
      id: 10,
      code: "Janelle Romero",
    },
    {
      id: 11,
      code: "Mai Workman",
    },
    {
      id: 12,
      code: "Thompson Watson",
    },
    {
      id: 13,
      code: "Benjamin Delaney",
    },
    {
      id: 14,
      code: "Aisha Wilson",
    },
    {
      id: 15,
      code: "Jaclyn Newman",
    },
    {
      id: 16,
      code: "Addie Gutierrez",
    },
    {
      id: 17,
      code: "Reid Mcconnell",
    },
    {
      id: 18,
      code: "Jacquelyn Doyle",
    },
    {
      id: 19,
      code: "Edna Travis",
    },
    {
      id: 20,
      code: "Mccarthy Wynn",
    },
    {
      id: 21,
      code: "Merrill Harris",
    },
    {
      id: 22,
      code: "Tracie Walls",
    },
    {
      id: 23,
      code: "Denise Salinas",
    },
    {
      id: 24,
      code: "Romero Perkins",
    },
    {
      id: 25,
      code: "Summer Bradshaw",
    },
    {
      id: 26,
      code: "Christina Henry",
    },
    {
      id: 27,
      code: "Patel Day",
    },
    {
      id: 28,
      code: "Jensen Weiss",
    },
    {
      id: 29,
      code: "Shields Yates",
    },
    {
      id: 30,
      code: "Shaffer Hodge",
    },
    {
      id: 31,
      code: "Kramer Williams",
    },
    {
      id: 32,
      code: "Terry Walker",
    },
    {
      id: 33,
      code: "Shelley Howard",
    },
    {
      id: 34,
      code: "Melody Morris",
    },
    {
      id: 35,
      code: "Bryan Merritt",
    },
    {
      id: 36,
      code: "Carrillo May",
    },
    {
      id: 37,
      code: "Claire Roman",
    },
    {
      id: 38,
      code: "Mullins Hicks",
    },
    {
      id: 39,
      code: "Natalie Schmidt",
    },
    {
      id: 40,
      code: "Wooten Dickerson",
    },
    {
      id: 41,
      code: "Angelique Coffey",
    },
    {
      id: 42,
      code: "Dillard Cobb",
    },
    {
      id: 43,
      code: "Ingrid Waters",
    },
    {
      id: 44,
      code: "Tania Kirby",
    },
    {
      id: 45,
      code: "Nola Wright",
    },
    {
      id: 46,
      code: "Kathy Herman",
    },
    {
      id: 47,
      code: "Nelda Willis",
    },
    {
      id: 48,
      code: "Shawna Estrada",
    },
    {
      id: 49,
      code: "Potts Mitchell",
    },
    {
      id: 50,
      code: "Ryan Sharpe",
    },
    {
      id: 51,
      code: "Guy Craig",
    },
    {
      id: 52,
      code: "Lindsey Meyer",
    },
    {
      id: 53,
      code: "Jean Mack",
    },
    {
      id: 54,
      code: "Jennings Carney",
    },
    {
      id: 55,
      code: "Kidd Love",
    },
    {
      id: 56,
      code: "Pam Berg",
    },
    {
      id: 57,
      code: "Sally Carey",
    },
    {
      id: 58,
      code: "Hayden Rowland",
    },
    {
      id: 59,
      code: "Lynda Gray",
    },
    {
      id: 60,
      code: "Kim Clarke",
    },
    {
      id: 61,
      code: "Puckett Rush",
    },
    {
      id: 62,
      code: "Kaye Bentley",
    },
    {
      id: 63,
      code: "Gwendolyn Stephens",
    },
    {
      id: 64,
      code: "Aurora Carson",
    },
    {
      id: 65,
      code: "Araceli Hartman",
    },
    {
      id: 66,
      code: "Rios Pearson",
    },
    {
      id: 67,
      code: "Terrell Hines",
    },
    {
      id: 68,
      code: "Marta Cameron",
    },
    {
      id: 69,
      code: "Strong Ayers",
    },
    {
      id: 70,
      code: "Coleen Winters",
    },
    {
      id: 71,
      code: "Anastasia Sweet",
    },
    {
      id: 72,
      code: "Bender Hensley",
    },
    {
      id: 73,
      code: "Nona Reed",
    },
    {
      id: 74,
      code: "Beverley Carr",
    },
    {
      id: 75,
      code: "Grimes Leach",
    },
    {
      id: 76,
      code: "Gallagher Conley",
    },
    {
      id: 77,
      code: "Katheryn Lane",
    },
    {
      id: 78,
      code: "Allison Lancaster",
    },
    {
      id: 79,
      code: "Schroeder Larson",
    },
    {
      id: 80,
      code: "Helena Velasquez",
    },
    {
      id: 81,
      code: "Everett Stanley",
    },
    {
      id: 82,
      code: "Rosales Tanner",
    },
    {
      id: 83,
      code: "Singleton Kidd",
    },
  ],
};
