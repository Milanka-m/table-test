import type { NextPage, GetServerSideProps } from "next";
import React from "react";
import Layout from "../layout/Layout";
import { Table, Popup } from "../components";
import formulasList from "../data/formulas";
import { IFormula } from "../types";

interface IIndexProps {
	formulas: IFormula[];
  formula: IFormula;
}

const Home: NextPage<IIndexProps> = ({ formulas, formula }) => {
  const [initialFormulas, setinitialFormulas] = React.useState<IFormula[]>(formulas && formulas);
  const [selectedFormula, setSelectedFormula] = React.useState<IFormula>(formula);
  const [isSaveBtnActive, setisSaveBtnActive] = React.useState<boolean>(false);
  const [isEditFormulaPopupOpen, setIsEditFormulaPopupOpen] = React.useState(false);

  const handleClickAddString = (): void => {
    const newString = { id: Number(formulas.length + 1) };
    setinitialFormulas([...formulas, newString]);
    setisSaveBtnActive(false);
  };

  const handleFormulaDelete = (formula: IFormula): void => {
    setinitialFormulas((state) => state.filter((c) => c.id !== formula.id));
    if (initialFormulas.length <= 3) {
      setisSaveBtnActive(true);
    }
  };
  
  const handleClickSave = (): void => {
    setinitialFormulas(formulas);
  };

  const handleClickCancel = (): void => {
    setinitialFormulas(formulas);
    setisSaveBtnActive(false);
  };

  const handleEditFormulaClick = (formula: IFormula): void => {
    setIsEditFormulaPopupOpen(true);
    setSelectedFormula(formula);
  }

  const handleClosePopup = (): void => {
    setIsEditFormulaPopupOpen(false);
  }

  const handleAddFormulaSubmit = (el : any): void => {
    const isFormula = initialFormulas.some(i => i.id === el.id);
    if (isFormula) {
      setinitialFormulas((state) => state.map((c) => c.id === el.id ? el : c));
    } else {
      setinitialFormulas([...initialFormulas, el]);
    }
    handleClosePopup();
  }

    return (
      <React.Fragment>
        <Layout
          title='Таблица математических формул'
        >
          <Table 
            isSaveBtnActive={isSaveBtnActive}
            handleClickSave={handleClickSave}
            handleClickCancel={handleClickCancel}
            initialFormulas={initialFormulas}
            handleClickAddString={handleClickAddString}
            handleFormulaDelete={handleFormulaDelete}
            handleEditFormulaClick={handleEditFormulaClick}
          />
        </Layout>
        <Popup 
          isOpen={isEditFormulaPopupOpen}
          onClose={handleClosePopup}
          onAddFormula={handleAddFormulaSubmit}
          selectedFormula={selectedFormula}
        />
      </React.Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
	const formulas: IFormula[] = formulasList;
	return {
		props: {
			formulas,
		},
	}
}

export default Home;
