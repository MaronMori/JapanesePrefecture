import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import PropTypes from "prop-types";

interface Population {
  message: boolean;
  result: {
    boundaryYear: number;
    data: [
      {
        label: string;
        data: [
          {
            year: number;
            value: number;
          },
        ];
      },
    ];
  };
}

export interface SelectPref {
  prefName: string;
  prefCode: number;
  data: Population;
}

interface ProviderProps {
  children: ReactNode;
}

interface context {
  handleSelectPref: (
    prefName: string,
    prefCode: number,
    isCheck: boolean,
  ) => void;
  selectPref: SelectPref[];
  setSelectPref: Dispatch<SetStateAction<SelectPref[]>>;
  isFetching: boolean;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
}

const selectPrefContext = createContext<context>({
  handleSelectPref: () => {},
  selectPref: [],
  setSelectPref: () => {},
  isFetching: false,
  setIsFetching: () => {},
});

export const SelectPrefProvider: FC<ProviderProps> = ({ children }) => {
  const [selectPref, setSelectPref] = useState<SelectPref[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const handleSelectPref = async (
    prefName: string,
    prefCode: number,
    isCheck: boolean,
  ) => {
    setIsFetching(true);
    if (isCheck) {
      try {
        const result = await fetch("api/getPopulation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prefCode: prefCode,
          }),
        });
        if (!result.ok) {
          console.log("バックエンドからのデータの取得に失敗しました。");
        }
        const data: Population = await result.json();
        const newSelectPref: SelectPref = {
          prefName: prefName,
          prefCode: prefCode,
          data: data,
        };
        setSelectPref([...selectPref, newSelectPref]);
      } catch (error) {
        console.log("バックエンドへのリクエストに失敗しました: " + error);
      }
    } else {
      const filterSelectPref = selectPref.filter(
        (pref) => pref.prefCode !== prefCode,
      );
      setSelectPref(filterSelectPref);
    }
  };

  const values = {
    handleSelectPref,
    setSelectPref,
    selectPref,
    isFetching,
    setIsFetching,
  };

  return (
    <selectPrefContext.Provider value={values}>
      {children}
    </selectPrefContext.Provider>
  );
};

SelectPrefProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useSelectPrefContext = () => useContext(selectPrefContext);
