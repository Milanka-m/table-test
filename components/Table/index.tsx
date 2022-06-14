import React from "react";
import { 
    faTrash, 
    faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IFormula } from "../../types";
import classNames from "classnames";
import styles from "./Table.module.scss";

interface IListProps {
	initialFormulas?: IFormula[];
    handleClickAddString: () => void;
    handleFormulaDelete: (formula: IFormula) => void;
    isSaveBtnActive: boolean;
    handleClickSave: () => void;
    handleClickCancel: () => void;
    handleEditFormulaClick: (formula: IFormula) => void;
}

const Table: React.FC<IListProps> = ({ 
    initialFormulas, 
    handleClickAddString,
    handleFormulaDelete, 
    isSaveBtnActive,
    handleClickSave,
    handleClickCancel,
    handleEditFormulaClick,
}) => {
	return (
        <section className={styles.table}>
            <div className={styles.table__container}>
                <div className={styles.table__listBtn}>
                    <button 
                        type="button"
                        className={styles.table__itemBtn}
                        onClick={handleClickCancel}
                        >
                        Отмена
                    </button>
                    <button 
                        type="button"
                        className={classNames(
                            styles.table__itemBtn, 
                            styles.table__itemBtn_bg,
                            {[styles.table__itemBtn_active]: isSaveBtnActive }
                            )}
                        onClick={handleClickSave}
                    >
                        Сохранить
                    </button>
                </div>
                <div className={styles.table__header}>
                    <p className={styles.table__title}>
                        Настройка формул
                    </p>
                    <button 
                        type="button"
                        className={styles.table__itemBtn}
                        onClick={handleClickAddString}
                    >
                        + Добавить формулу
                    </button>
                </div>
                <div className={styles.table__rar}>
                    <table className={styles.table__group}>
                        <thead>
                            <tr className={styles.table__groupHead}>
                                <th>Формула</th>
                                <th>Действия</th>
                            </tr>
                            <tr className={styles.table__groupHead}>
                                <th>1</th>
                                <th>2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initialFormulas &&
                                initialFormulas!.map((formula) => {
                                    return (
                                        <tr className={styles.table__groupTbody} key={formula.id}>
                                            <td className={styles.table__formula}>
                                                {formula.body}
                                            </td>
                                            <td className={styles.table__groupBtn}>
                                                <button 
                                                    type="button"
                                                    className={styles.table__editBtn}
                                                    onClick={() => handleFormulaDelete(formula)}
                                                >
                                                    <FontAwesomeIcon 
                                                        icon={faTrash} 
                                                        style={{ color: '#ff2727' }}
                                                    />
                                                </button>
                                                <button 
                                                    className={classNames(
                                                        styles.table__editBtn, 
                                                        styles.table__editBtn_border)}
                                                    onClick={() => handleEditFormulaClick(formula)}
                                                    >
                                                    <FontAwesomeIcon 
                                                        icon={faCalculator}
                                                        style={{ color: '#2760ff' }}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
      </section>
	);
}

export default Table;